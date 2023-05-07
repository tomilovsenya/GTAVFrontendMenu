import { LobbyEntry, LobbyPlayer, LobbyWindow } from "../menu_classes/lobby_entries.js";

const lobbyDifficulty = new LobbyEntry("lobby_category_diff", "Difficulty", ["Easy", "Medium", "Hard"], false, false);
const lobbyClothing = new LobbyEntry("lobby_category_clothing", "Heist Clothing", ["Host Selected", "Player Saved"], false, false);
const lobbyCamera = new LobbyEntry("lobby_category_camera", "Camera Lock", ["menu_common_off", "First Person", "Third Person"], false, false);
const lobbyConfirm = new LobbyEntry("lobby_category_confirm", "Confirm Settings", [], false, false, true);

const crewRSG = { name: "Rockstar Games", tag: "RSG" };

const lobbyPlayer0 = new LobbyPlayer("GTADev0", 250, crewRSG, 0, 0);
const lobbyPlayer1 = new LobbyPlayer("GTADev1", 10, undefined, 1, 1);
const lobbyPlayer2 = new LobbyPlayer("GTADev2", 2500, undefined, 2, 1);
export const lobbyPlayer3 = new LobbyPlayer("GTADev3", 500, undefined, 4, 1);

const lobbyCategories = { id: "lobby_categories", list: [lobbyDifficulty, lobbyClothing, lobbyCamera, lobbyConfirm] };
const lobbyInfo = { title: "Humane Labs Raid", descr: "Humane Labs descr.", creator: "Rockstar", rank: 25, players: 8, jobType: "Heist" };
const lobbyPlayers = [lobbyPlayer0, lobbyPlayer1, lobbyPlayer2];
export const lobbyWindow = new LobbyWindow("lobby_window", lobbyInfo, lobbyCategories, lobbyPlayers);

export let allLobbyEntries = [];
