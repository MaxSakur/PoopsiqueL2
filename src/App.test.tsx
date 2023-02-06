import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders learn react link", () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

// const addButton = document.getElementById("add");
// const timeInputData = document.getElementById("time");
// const rbNameInputData = document.getElementById("rbName");
// const cleanStorageButton = document.getElementById("clean");
// const arr = JSON.parse(localStorage.getItem("rbList")) || [];

// // SOUNDS
// let move = new Audio();
// move.src = "https://www.dropbox.com/s/fiyx4q2mdwynraj/FF7CursorMove.mp3?raw=1";
// let alert = new Audio("./bell.mp3");

// const raidBossArr = [
//   "70 lvl, Cabrio (Seal of Shilen)",
//   "70 lvl, Korim (7 TOI)",
//   "70 lvl, Skylancer (Colisey)",
//   "70 lvl, Lokness (1ый остров)",
//   "70 lvl, Palibati (Seal of Shilen)",
//   "70 lvl, Behemoth (Варка)",
//   "70 lvl, Zakaron (каты Витч)",
//   "70 lvl, Meanas Anor (Blazing Swamp)",
//   "71 lvl, von Hellmann (Cursed Village)",
//   "71 lvl, Immortal Mardil (2,5 TOI)",
//   "72 lvl, Water Dragon Sheshark (2ой остров)",
//   "72 lvl, Kandra (Варка)",
//   "72 lvl, Tanatos (Ancient Battleground)",
//   "72 lvl, Flame of Splendor Barakiel (VoS)",
//   "73 lvl, Hallate (3 TOI)",
//   "73 lvl, Plague Golem (Wall of Argos)",
//   "74 lvl, Cloe (LoA 2ой нобл порт)",
//   "74 lvl, Sobekk (3ий остров)",
//   "74 lvl, Bumbalump (вызовной Hot Springs)",
//   "75 lvl, Kernon (8 TOI)",
//   "75 lvl, Naga (Blazing Swamp)",
//   "75 lvl, Olkuth (Silent Valley)",
//   "75 lvl, Palatanos of Horrific Power (Дерево - Blazing Swamp)",
//   "75 lvl, Decarbia (Seal of Shilen)",
//   "75 lvl, Ipos (Blazing Swamp)",
//   "75 lvl, Shax (Disciples Necropolis)",
//   "76 lvl, Flamestone Giant (картошка - Blazing Swamp)",
//   "76 lvl, Ashakiel (4ый остров)",
//   "78 lvl, Shuriel (11 TOI)",
//   "78 lvl, Glaki (Silent Valley)",
//   "78 lvl, Hestia (Hot Springs)",
//   "79 lvl, Golkonda (11 TOI)",
//   "79 lvl, Galaxia (13 TOI)",
//   "80 lvl, Queen Shyeed (Stokato Nest)",
//   "80 lvl, Ketra Hero Hekaton (Ketra Entarance)",
//   "80 lvl, Varka Hero Shadith (Varka Center)",
//   "80 lvl, Ketra Chief Brakki (Ketra Village)",
//   "80 lvl, Varka Chief Horus (Varka Village)",
//   "84 lvl, Ketra Commander Tayr (Ketra Village)",
//   "84 lvl, Varka Commander Mos (Varka Village)",
//   "85 lvl, Ember",
//   "85 lvl, Uruka",
//   "80 lvl, Andreas Van Halter",
//   "80 lvl, Anais",
// ];

// // ADD ADDITIONAL '0' TO SINGLE DATE SYMBOL
// const updateSingleDateSymbol = (el) => {
//   return el.toString().length === 1 ? `${"0" + el}` : el;
// };

// // CLEAN NODE WITH ADDED ELEMENTS
// const cleanNodeList = () =>
//   document.querySelectorAll(".item").forEach((e) => e.remove());

// const sortArrByName = (data) => {
//   let sortedData = data.sort((a, b) => {
//     let keyA = Number(a.resp.split(":")[0]);
//     let keyB = Number(b.resp.split(":")[0]);

//     if (keyA < keyB) return 1;
//     if (keyA > keyB) return -1;
//     return 0;
//   });

//   // add list of elements
//   sortedData.map((el) => {
//     addNewListItem(el.name, el.resp);
//   });
// };
// // ADD 12 HOURS TO RESP PERIOD
// const getFullRespTime = (value) => {
//   const hours = Number(value.split(":")[0]);
//   const minutes = updateSingleDateSymbol(Number(value.split(":")[1]));
//   let localHoursSum = hours + 12;

//   if (localHoursSum == 24) {
//     return `${00}:${minutes}`;
//   } else if (localHoursSum > 24) {
//     return `${updateSingleDateSymbol(localHoursSum - 24)}:${minutes}`;
//   } else {
//     return `${updateSingleDateSymbol(localHoursSum)}:${minutes}`;
//   }
// };

// // RERENDER
// const reRenderNodeList = () => {
//   cleanNodeList();
//   sortArrByName(arr);
//   arr.map((el) => {
//     addNewListItem(el.name, el.resp);
//   });
// };

// // CURRENT TIME
// const updateCurrentTime = () => {
//   const today = new Date();
//   const currenTime =
//     updateSingleDateSymbol(today.getHours()) +
//     ":" +
//     updateSingleDateSymbol(today.getMinutes()) +
//     ":" +
//     updateSingleDateSymbol(today.getSeconds());
//   document.getElementById("currentTime").innerHTML = currenTime;
// };

// // CLEAN LOCAL STORAGE && NODE LIST
// cleanStorageButton.addEventListener("click", () => {
//   localStorage.removeItem("rbList");
//   cleanNodeList();
//   window.location.reload();
// });

// // ADD NEW ITEM TO LIST
// const addNewListItem = (name, resp) => {
//   const list_item = document.createElement("li");
//   const item_name = document.createElement("p");
//   const item_resp = document.createElement("p");

//   list_item.className = "list_item item";
//   item_name.textContent = name;
//   item_name.className = "name";
//   item_resp.textContent = resp;
//   item_resp.className = "resp";

//   list_item.appendChild(item_name);
//   list_item.appendChild(item_resp);

//   document.getElementById("list").appendChild(list_item);
// };

// // GENERATING NEW LIST ON PAGE LOAD
// document.addEventListener("DOMContentLoaded", () => {
//   // Add items to select
//   raidBossArr.map((el) => {
//     const item = document.createElement("option");
//     item.value = el;
//     item.innerText = el;
//     document.getElementById("rbName").appendChild(item);
//   });
//   sortArrByName(arr);
//   // TODO: re-render elements
// });

// // ADD NEW ELEMENT
// addButton.addEventListener("click", () => {
//   const respTime = getFullRespTime(timeInputData.value);
//   const rbName = rbNameInputData.value;
//   if (respTime && rbName) {
//     arr.push({
//       resp: respTime,
//       name: rbName,
//     });

//     timeInputData.value = "";
//     rbNameInputData.value = "";

//     move.play();
//     // ADD TO TABLE
//     addNewListItem(rbName, respTime);
//     // ADD TO LOCAL STORAGE
//     localStorage.setItem("rbList", JSON.stringify(arr));
//     // RESORT LIST OF ELEMENTS
//     reRenderNodeList();
//   } else {
//     alert("Заполните оба поля");
//   }
// });

// // CALCULATE TIME
// const getRestTime = () => {
//   const today = new Date();
//   const todayHours = today.getHours();
//   const todayMinutes = today.getMinutes();
//   const todayDate = `${updateSingleDateSymbol(
//     todayHours
//   )}:${updateSingleDateSymbol(todayMinutes)}`;

//   // COUNT TIME
//   updateCurrentTime();

//   arr.map((el) => {
//     //   RESP !!!
//     if (el.resp == todayDate) {
//       // IF TRUE - DO TMTNG
//       alert.play();

//       // TODO: Make it like modal window
//       confirm(`${el.name} пошел РЕСПАУН`);
//     }
//   });
// };

// // Start bouncing =)
// setInterval(() => getRestTime(), 1000);
