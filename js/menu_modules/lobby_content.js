import { LobbyEntry, LobbyPlayer, LobbyWindow } from "../menu_classes/lobby_entries.js";

const lobbyDifficulty = new LobbyEntry("lobby_category_diff", "Difficulty", ["Easy", "Medium", "Hard"], false, false);
const lobbyClothing = new LobbyEntry("lobby_category_clothing", "Heist Clothing", ["Host Selected", "Player Saved"], false, false);
const lobbyCamera = new LobbyEntry("lobby_category_camera", "Camera Lock", ["menu_common_off", "First Person", "Third Person"], false, false);
const lobbyConfirm = new LobbyEntry("lobby_category_confirm", "Confirm Settings", [], false, false, true);

const crewRSG = { name: "Rockstar Games", tag: "RSG" };
const crewSCRE = { name: "That Score", tag: "SCRE" };

const lobbyPlayer0 = new LobbyPlayer("GTADev0", 250, crewRSG, 0, 0);
const lobbyPlayer1 = new LobbyPlayer("GTADev1", 10, undefined, 1, -1);
const lobbyPlayer2 = new LobbyPlayer("GTADev2", 2500, undefined, 1, -1);
export const lobbyPlayer3 = new LobbyPlayer("GTADev3", 500, undefined, 4, 22);
export const lobbyPlayer4 = new LobbyPlayer("GTADev4", 66, crewSCRE, 5, 0);
export const lobbyPlayer5 = new LobbyPlayer("GTADev5", 555, crewSCRE, 3, 0);

const lobbyCategories = { id: "lobby_categories", list: [lobbyDifficulty, lobbyClothing, lobbyCamera, lobbyConfirm] };
const lobbyInfo = { title: "Humane Labs Raid", descr: "Humane Labs descr.", creator: "Rockstar", rank: 25, players: 8, jobType: "Heist" };
const lobbyPlayers = [lobbyPlayer0, lobbyPlayer1, lobbyPlayer2, lobbyPlayer4, lobbyPlayer5];
export const lobbyWindow = new LobbyWindow("lobby_window", lobbyInfo, lobbyCategories, lobbyPlayers);

export let allLobbyEntries = [];
