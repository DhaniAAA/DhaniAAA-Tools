const config = window.APP_CONFIG || {};
const supabaseUrl = config.SUPABASE_URL || config.supabaseUrl;
const supabaseAnonKey = config.SUPABASE_ANON_KEY || config.supabaseAnonKey;
const supabase = supabaseUrl && supabaseAnonKey && window.supabase
  ? window.supabase.createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        storageKey: "awc-auth"
      }
    })
  : null;

const dom = {
  aliasLabel: document.querySelector("#alias-label"),
  changeAliasBtn: document.querySelector("#change-alias"),
  refreshRoomsBtn: document.querySelector("#refresh-rooms"),
  roomList: document.querySelector("#room-list"),
  connectionBanner: document.querySelector("#connection-banner"),
  rateLimitBanner: document.querySelector("#rate-limit-banner"),
  moderationBanner: document.querySelector("#moderation-banner"),
  messages: document.querySelector("#messages"),
  messageTemplate: document.querySelector("#message-template"),
  messageForm: document.querySelector("#message-form"),
  messageInput: document.querySelector("#message-input"),
  charCount: document.querySelector("#char-count"),
  replyCancel: document.querySelector("#attach-reply-cancel"),
  mutedUsersList: document.querySelector("#muted-users"),
  authDialog: document.querySelector("#auth-dialog"),
  authForm: document.querySelector("#auth-form"),
  aliasInput: document.querySelector("#alias-input"),
  reportDialog: document.querySelector("#report-dialog"),
  reportForm: document.querySelector("#report-form"),
  reportReason: document.querySelector("#report-reason"),
  adminDialog: document.querySelector("#admin-dialog"),
  adminForm: document.querySelector("#admin-form"),
  adminTokenInput: document.querySelector("#admin-token"),
  adminPanel: document.querySelector("#admin-panel"),
  openAdminBtn: document.querySelector("#open-admin"),
  closeAdminBtn: document.querySelector("#close-admin"),
  reportList: document.querySelector("#report-list")
};

const state = {
  session: null,
  profile: null,
  rooms: [],
  currentRoomId: null,
  messages: new Map(),
  mutedUsers: new Map(),
  replyTo: null,
  adminUnlocked: false,
  pendingReportMessageId: null,
  realtimeChannel: null,
  messageTimestamps: [],
  authError: null
};

const storageKeys = {
  alias: "awc-alias",
  muted: "awc-muted-users"
};

const formatters = {
  time: new Intl.DateTimeFormat(undefined, {
    hour: "2-digit",
    minute: "2-digit"
  })
};

init();

async function init() {
  attachEventListeners();
  hydrateMutedUsers();
  if (!supabase) {
    console.warn("Supabase is not configured. Populate src/scripts/config.js based on src/scripts/config.example.js.");
    injectOfflineState();
    return;
  }
  await restoreSession();
  if (!state.session) {
    if (state.authError) {
      return;
    }
  }
  await ensureProfile();
  await loadRooms();
  autoSelectFirstRoom();
  startRealtimeMonitor();
}

function attachEventListeners() {
  dom.changeAliasBtn?.addEventListener("click", () => showAliasDialog());
  dom.authDialog?.addEventListener("close", handleAliasDialogClose);
  dom.aliasInput?.addEventListener("input", handleAliasInput);
  dom.messageForm?.addEventListener("submit", handleMessageSubmit);
  dom.messageInput?.addEventListener("input", updateCharCount);
  dom.replyCancel?.addEventListener("click", clearReply);
  dom.refreshRoomsBtn?.addEventListener("click", loadRooms);
  dom.reportDialog?.addEventListener("close", handleReportClose);
  dom.openAdminBtn?.addEventListener("click", () => dom.adminDialog?.showModal());
  dom.adminDialog?.addEventListener("close", handleAdminDialogClose);
  dom.closeAdminBtn?.addEventListener("click", () => {
    dom.adminPanel.hidden = true;
    state.adminUnlocked = false;
  });
  dom.messages?.addEventListener("click", handleMessageAction);
}

function hydrateMutedUsers() {
  try {
    const data = localStorage.getItem(storageKeys.muted);
    if (!data) return;
    const parsed = JSON.parse(data);
    parsed.forEach(({ userId, alias }) => {
      state.mutedUsers.set(userId, alias);
    });
    renderMutedUsers();
  } catch (error) {
    console.error("Failed to hydrate muted users", error);
  }
}

function persistMutedUsers() {
  const payload = Array.from(state.mutedUsers.entries()).map(([userId, alias]) => ({ userId, alias }));
  localStorage.setItem(storageKeys.muted, JSON.stringify(payload));
}

function injectOfflineState() {
  dom.connectionBanner?.classList.remove("hidden");
  dom.connectionBanner.textContent = "Supabase is not configured. Add credentials to start chatting.";
  dom.messageForm?.classList.add("hidden");
  dom.changeAliasBtn?.setAttribute("disabled", "true");
}

function handleAuthFailure(error) {
  state.session = null;
  state.authError = formatAuthError(error);
  console.error("Anonymous sign-in failed", error);
  displayConnectionError(state.authError);
  dom.messageForm?.classList.add("hidden");
  dom.changeAliasBtn?.setAttribute("disabled", "true");
  if (dom.authDialog?.open) {
    dom.authDialog.close();
  }
}

function displayConnectionError(message) {
  if (!dom.connectionBanner) return;
  dom.connectionBanner.classList.remove("hidden");
  dom.connectionBanner.textContent = message;
}

function restoreInteractiveState() {
  dom.messageForm?.classList.remove("hidden");
  dom.changeAliasBtn?.removeAttribute("disabled");
  dom.connectionBanner?.classList.add("hidden");
}

function formatAuthError(error) {
  if (!error) {
    return "Cannot sign in anonymously right now. Retry later.";
  }
  const message = typeof error.message === "string" ? error.message : "";
  const lower = message.toLowerCase();
  if (error.status === 422 || (lower.includes("anonymous sign-in") && lower.includes("disabled"))) {
    return "Anonymous sign-in is disabled. Enable it in Supabase Auth -> Providers -> Anonymous.";
  }
  return message || "Cannot sign in anonymously right now. Retry later.";
}

async function restoreSession() {
  try {
    const {
      data: { session },
      error
    } = await supabase.auth.getSession();
    if (error) {
      throw error;
    }
    if (session) {
      state.session = session;
      state.authError = null;
      restoreInteractiveState();
      return;
    }
    const { data, error: signInError } = await supabase.auth.signInAnonymously();
    if (signInError) {
      throw signInError;
    }
    state.session = data.session;
    state.authError = null;
    restoreInteractiveState();
  } catch (error) {
    handleAuthFailure(error);
  }
}

async function ensureProfile() {
  if (!state.session) {
    if (!state.authError) {
      showAliasDialog();
    }
    return;
  }
  const storedAlias = localStorage.getItem(storageKeys.alias) || buildGuestAlias();
  const { data: profile } = await supabase
    .from("profiles")
    .select("user_id, alias, is_shadow_banned")
    .eq("user_id", state.session.user.id)
    .maybeSingle();
  if (profile) {
    state.profile = profile;
    dom.aliasLabel.textContent = profile.alias;
    localStorage.setItem(storageKeys.alias, profile.alias);
    if (profile.is_shadow_banned) {
      dom.moderationBanner?.classList.remove("hidden");
    }
    return;
  }
  dom.aliasInput.value = storedAlias;
  showAliasDialog();
}

function showAliasDialog() {
  if (!dom.authDialog?.open) {
    dom.aliasInput.value = dom.aliasInput.value || localStorage.getItem(storageKeys.alias) || buildGuestAlias();
    dom.authDialog.showModal();
    dom.aliasInput.focus();
  }
}

function handleAliasInput() {
  dom.aliasInput.value = dom.aliasInput.value.replace(/\s+/g, "");
}

async function handleAliasDialogClose() {
  if (dom.authDialog.returnValue !== "confirm") {
    if (!state.profile) {
      dom.authDialog.showModal();
    }
    return;
  }
  const alias = dom.aliasInput.value.trim();
  if (!alias) {
    dom.authDialog.showModal();
    return;
  }
  if (!state.session?.user) {
    displayConnectionError(state.authError || "Anonymous sign-in is required before setting an alias.");
    dom.authDialog.showModal();
    return;
  }
  const payload = { alias };
  const { error } = await supabase
    .from("profiles")
    .upsert({
      user_id: state.session.user.id,
      alias,
      updated_at: new Date().toISOString()
    })
    .select()
    .single();
  if (error) {
    console.error("Failed to set alias", error);
    dom.authDialog.showModal();
    return;
  }
  state.profile = {
    user_id: state.session.user.id,
    alias,
    is_shadow_banned: false
  };
  dom.aliasLabel.textContent = alias;
  localStorage.setItem(storageKeys.alias, alias);
}

function buildGuestAlias() {
  return `Guest${Math.floor(1000 + Math.random() * 9000)}`;
}

async function loadRooms() {
  if (!supabase) {
    state.rooms = config.defaultRooms || [];
    renderRooms();
    return;
  }
  const { data, error } = await supabase
    .from("rooms")
    .select("id, name, description, is_active")
    .eq("is_active", true)
    .order("name", { ascending: true });
  if (error) {
    console.error("Failed to load rooms", error);
    state.rooms = config.defaultRooms || [];
  } else if (data?.length) {
    state.rooms = data;
  } else {
    state.rooms = config.defaultRooms || [];
  }
  renderRooms();
}

function renderRooms() {
  dom.roomList.innerHTML = "";
  state.rooms.forEach((room) => {
    const button = document.createElement("button");
    button.type = "button";
    button.dataset.roomId = room.id;
    button.innerHTML = `
      <strong>${room.name}</strong><br />
      <span class="muted">${room.description || ""}</span>
    `;
    if (room.id === state.currentRoomId) {
      button.classList.add("active");
    }
    button.addEventListener("click", () => selectRoom(room.id));
    dom.roomList.appendChild(button);
  });
}

function autoSelectFirstRoom() {
  if (!state.rooms.length) return;
  const nextRoom = state.rooms.find((room) => room.id === state.currentRoomId) || state.rooms[0];
  selectRoom(nextRoom.id);
}

async function selectRoom(roomId) {
  if (state.currentRoomId === roomId) return;
  state.currentRoomId = roomId;
  renderRooms();
  dom.messages.innerHTML = "";
  state.messages.clear();
  unsubscribeRealtime();
  await fetchMessages(roomId);
  subscribeToRoom(roomId);
}

async function fetchMessages(roomId) {
  if (!supabase) return;
  const { data, error } = await supabase
    .from("messages")
    .select("id, user_id, alias_snapshot, content, created_at, deleted_at, reply_to, is_shadow_hidden")
    .eq("room_id", roomId)
    .order("created_at", { ascending: true })
    .limit(500);
  if (error) {
    console.error("Failed to load messages", error);
    return;
  }
  data.forEach((message) => {
    state.messages.set(message.id, message);
  });
  renderMessages();
}

function renderMessages() {
  const fragment = document.createDocumentFragment();
  const mutedIds = new Set(state.mutedUsers.keys());
  Array.from(state.messages.values())
    .sort((a, b) => new Date(a.created_at) - new Date(b.created_at))
    .forEach((message) => {
      if (mutedIds.has(message.user_id)) return;
      const el = buildMessageElement(message);
      fragment.appendChild(el);
    });
  dom.messages.innerHTML = "";
  dom.messages.appendChild(fragment);
  dom.messages.scrollTop = dom.messages.scrollHeight;
}

function buildMessageElement(message) {
  const template = dom.messageTemplate.content.cloneNode(true);
  const article = template.querySelector(".message");
  article.dataset.messageId = message.id;
  if (message.deleted_at || message.is_shadow_hidden) {
    article.classList.add("deleted");
  }
  article.querySelector(".alias").textContent = message.alias_snapshot || "Unknown";
  const time = new Date(message.created_at);
  const timeElement = article.querySelector(".timestamp");
  timeElement.dateTime = time.toISOString();
  timeElement.textContent = formatters.time.format(time);
  const contentElement = article.querySelector(".content");
  contentElement.textContent = message.content;
  const deleteBtn = article.querySelector('[data-action="delete"]');
  if (state.adminUnlocked || config.admin?.privilegedAliases?.includes(state.profile?.alias)) {
    deleteBtn.hidden = false;
  }
  return article;
}

async function handleMessageSubmit(event) {
  event.preventDefault();
  if (!state.currentRoomId || !state.profile) return;
  const content = dom.messageInput.value.trim();
  if (!content) return;
  if (!checkRateLimit()) {
    dom.rateLimitBanner.classList.remove("hidden");
    setTimeout(() => dom.rateLimitBanner.classList.add("hidden"), 3000);
    return;
  }
  const filteredContent = applyContentFilter(content);
  const payload = {
    room_id: state.currentRoomId,
    user_id: state.session.user.id,
    alias_snapshot: state.profile.alias,
    content: filteredContent,
    reply_to: state.replyTo,
    created_at: new Date().toISOString()
  };
  dom.messageInput.value = "";
  updateCharCount();
  clearReply();
  try {
    const { error } = await supabase.from("messages").insert(payload);
    if (error) {
      throw error;
    }
    state.messageTimestamps.push(Date.now());
  } catch (err) {
    console.error("Failed to send message", err);
    dom.connectionBanner.classList.remove("hidden");
    dom.connectionBanner.textContent = "Message failed to send. We will retry automatically.";
  }
}

function updateCharCount() {
  const length = dom.messageInput.value.length;
  dom.charCount.textContent = `${length} / 1000`;
}

function checkRateLimit() {
  const limit = config.rateLimit || { maxMessages: 10, intervalMs: 30000 };
  const now = Date.now();
  state.messageTimestamps = state.messageTimestamps.filter((ts) => now - ts < limit.intervalMs);
  return state.messageTimestamps.length < limit.maxMessages;
}

function applyContentFilter(content) {
  const filters = config.contentFilters?.blockedPatterns || [];
  if (!filters.length) return content;
  return filters.reduce((acc, pattern) => {
    const regex = new RegExp(pattern, "ig");
    return acc.replace(regex, config.contentFilters.replacement || "[filtered]");
  }, content);
}

function clearReply() {
  state.replyTo = null;
  dom.replyCancel.classList.add("hidden");
}

function handleMessageAction(event) {
  const button = event.target.closest("button[data-action]");
  if (!button) return;
  const messageId = button.closest(".message")?.dataset?.messageId;
  if (!messageId) return;
  const message = state.messages.get(messageId);
  if (!message) return;
  switch (button.dataset.action) {
    case "reply":
      state.replyTo = messageId;
      dom.replyCancel.classList.remove("hidden");
      dom.messageInput.focus();
      break;
    case "report":
      openReportDialog(messageId);
      break;
    case "mute":
      muteUser(message.user_id, message.alias_snapshot);
      break;
    case "delete":
      softenMessage(messageId);
      break;
    case "react":
      reactToMessage(messageId, "??");
      break;
  }
}

function muteUser(userId, alias) {
  if (state.mutedUsers.has(userId)) return;
  state.mutedUsers.set(userId, alias);
  persistMutedUsers();
  renderMutedUsers();
  renderMessages();
}

function renderMutedUsers() {
  dom.mutedUsersList.innerHTML = "";
  state.mutedUsers.forEach((alias, userId) => {
    const li = document.createElement("li");
    li.textContent = alias;
    const button = document.createElement("button");
    button.textContent = "Unmute";
    button.className = "ghost tiny";
    button.addEventListener("click", () => {
      state.mutedUsers.delete(userId);
      persistMutedUsers();
      renderMutedUsers();
      renderMessages();
    });
    li.appendChild(button);
    dom.mutedUsersList.appendChild(li);
  });
}

function openReportDialog(messageId) {
  state.pendingReportMessageId = messageId;
  dom.reportReason.value = "";
  dom.reportDialog.showModal();
}

async function handleReportClose() {
  if (dom.reportDialog.returnValue !== "confirm") {
    state.pendingReportMessageId = null;
    return;
  }
  const reason = dom.reportReason.value.trim();
  if (!reason || !state.pendingReportMessageId) return;
  try {
    const { error } = await supabase.from("reports").insert({
      message_id: state.pendingReportMessageId,
      reporter_id: state.session.user.id,
      reason
    });
    if (error) throw error;
  } catch (error) {
    console.error("Failed to submit report", error);
  } finally {
    state.pendingReportMessageId = null;
  }
}

async function reactToMessage(messageId, emoji) {
  try {
    const { error } = await supabase.from("reactions").upsert({
      message_id: messageId,
      user_id: state.session.user.id,
      emoji
    });
    if (error) throw error;
  } catch (error) {
    console.error("Failed to react to message", error);
  }
}

async function softenMessage(messageId) {
  try {
    const { error } = await supabase
      .from("messages")
      .update({ deleted_at: new Date().toISOString() })
      .eq("id", messageId);
    if (error) throw error;
  } catch (error) {
    console.error("Failed to soft delete message", error);
  }
}

async function handleAdminDialogClose() {
  if (dom.adminDialog.returnValue !== "confirm") return;
  const token = dom.adminTokenInput.value.trim();
  if (!token || token !== config.admin?.token) {
    alert("Invalid admin token");
    return;
  }
  state.adminUnlocked = true;
  dom.adminPanel.hidden = false;
  await loadReports();
  renderMessages();
}

async function loadReports() {
  if (!supabase) return;
  const { data, error } = await supabase
    .from("reports")
    .select("id, message_id, reason, reporter_id, created_at, status")
    .eq("status", "open")
    .order("created_at", { ascending: false })
    .limit(100);
  if (error) {
    console.error("Failed to load reports", error);
    return;
  }
  renderReports(data || []);
}

function renderReports(reports) {
  dom.reportList.innerHTML = "";
  reports.forEach((report) => {
    const item = document.createElement("li");
    const info = document.createElement("div");
    info.innerHTML = `
      <strong>${report.reason}</strong><br />
      <span class="muted">Message: ${report.message_id.slice(0, 8)}� | Reporter: ${report.reporter_id.slice(0, 8)}�</span>
    `;
    const actions = document.createElement("div");
    actions.style.display = "flex";
    actions.style.gap = "0.4rem";
    const resolveBtn = document.createElement("button");
    resolveBtn.className = "ghost tiny";
    resolveBtn.textContent = "Resolve";
    resolveBtn.addEventListener("click", () => resolveReport(report.id));
    const deleteBtn = document.createElement("button");
    deleteBtn.className = "ghost tiny danger";
    deleteBtn.textContent = "Delete msg";
    deleteBtn.addEventListener("click", () => softenMessage(report.message_id));
    actions.append(resolveBtn, deleteBtn);
    item.append(info, actions);
    dom.reportList.appendChild(item);
  });
}

async function resolveReport(reportId) {
  try {
    const { error } = await supabase
      .from("reports")
      .update({ status: "resolved", resolved_at: new Date().toISOString() })
      .eq("id", reportId);
    if (error) throw error;
    await loadReports();
  } catch (error) {
    console.error("Failed to resolve report", error);
  }
}

function subscribeToRoom(roomId) {
  if (!supabase) return;
  state.realtimeChannel = supabase
    .channel(`room-${roomId}`)
    .on(
      "postgres_changes",
      { event: "INSERT", schema: "public", table: "messages", filter: `room_id=eq.${roomId}` },
      (payload) => {
        state.messages.set(payload.new.id, payload.new);
        pruneShadowMessages();
        appendMessage(payload.new);
      }
    )
    .on(
      "postgres_changes",
      { event: "UPDATE", schema: "public", table: "messages", filter: `room_id=eq.${roomId}` },
      (payload) => {
        state.messages.set(payload.new.id, payload.new);
        renderMessages();
      }
    )
    .subscribe((status) => {
      toggleConnectionBanner(status !== "SUBSCRIBED");
    });
}

function unsubscribeRealtime() {
  if (state.realtimeChannel) {
    supabase.removeChannel(state.realtimeChannel);
    state.realtimeChannel = null;
  }
}

function toggleConnectionBanner(disconnected) {
  dom.connectionBanner.classList.toggle("hidden", !disconnected);
}

function appendMessage(message) {
  if (state.mutedUsers.has(message.user_id)) return;
  const el = buildMessageElement(message);
  dom.messages.appendChild(el);
  dom.messages.scrollTop = dom.messages.scrollHeight;
}

function pruneShadowMessages() {
  if (!state.profile?.is_shadow_banned) return;
  dom.moderationBanner?.classList.remove("hidden");
}

async function startRealtimeMonitor() {
  if (!supabase) return;
  supabase.auth.onAuthStateChange(async (_event, session) => {
    state.session = session;
    if (!session) {
      await restoreSession();
      await ensureProfile();
    }
  });
}




