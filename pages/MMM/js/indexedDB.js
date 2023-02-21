// import { PlayList } from "./playList.js";

export class IndexedDB {
  constructor(playList) {
    this.playList = playList;
    this.allPalyList = [];
    this.audio = document.getElementById("audio");

    const indexedDB = window.indexedDB;

    if (!indexedDB)
      window.alert("해당 브라우저에서는 indexedDB를 지원하지 않습니다.");
    else {
      let db;
      const request = indexedDB.open("mmm"); // 3. SampleDB(db) 열기

      //createIndex로 분리하기
      //src, id, name
      request.onupgradeneeded = (e) => {
        db = e.target.result;
        const objectStore = db.createObjectStore("mmmAudio", {
          autoIncrement: true,
        }); // 4. name저장소 만들고
        request.onerror = (e) => alert("failed");
        request.onsuccess = (e) => (db = request.result); // 5. 성공시 db에 result를 저장
      };
    }
  }

  setAllPlayList(allPalyList) {
    this.allPalyList = allPalyList;
  }

  getAllPlayList() {
    return this.allPalyList;
  }

  async writeIdxedDB(audios) {
    return new Promise((resolve, reject) => {
      const request = window.indexedDB.open("mmm");
      request.onerror = (e) => {
        alert("DataBase error", e.target.errorCode);
      };

      request.onsuccess = (e) => {
        const db = e.target.result;
        const transaction = db
          .transaction(["mmmAudio"], "readwrite")
          .objectStore("mmmAudio");

        audios.forEach((audio) => {
          transaction.add(audio);
        });
        resolve(200);
      };
    }).then((result) => result);
  }

  async getAllIndexedPlayList() {
    return new Promise((resolve, reject) => {
      const request = window.indexedDB.open("mmm"); // 1. DB 열기
      request.onerror = (e) => reject(console.log(e.target.errorCode));

      request.onsuccess = (e) => {
        const db = request.result;
        const transaction = db.transaction("mmmAudio");
        var allPalyListArr = [];
        transaction.onerror = (e) => console.log("fail");
        transaction.oncomplete = (e) => console.log("success");

        const objStore = transaction.objectStore("mmmAudio"); // 2. name 저장소 접근
        const cursorRequest = objStore.openCursor();
        cursorRequest.onsuccess = (e) => {
          var cursor = e.target.result;

          if (cursor) {
            const value = objStore.get(cursor.key); // 3. 커서를 사용해 데이터 접근
            value.onsuccess = (e) => {
              allPalyListArr.push({
                ...e.target.result,
                id: e.target.result.id,
                key: cursor.key,
              });
              // this.audio.src = e.target.result.src;
            };
            cursor.continue(); // 4. cursor로 순회
          } else {
            this.setAllPlayList(allPalyListArr);
            resolve(this.getAllPlayList());
          }
        };
      };
    }).then((result) => result);
  }

  async playListDelete(key) {
    return new Promise((resolve, reject) => {
      const request = window.indexedDB.open("mmm"); // 1. db 열기
      request.onerror = (e) => console.log(e.target.errorCode);

      request.onsuccess = (e) => {
        const db = request.result;
        const transaction = db.transaction("mmmAudio", "readwrite");
        transaction.onerror = (e) => reject(console.log("fail"));
        transaction.oncomplete = (e) => console.log("success");

        const objStore = transaction.objectStore("mmmAudio"); // 2. name 저장소 접근
        const objStoreRequest = objStore.delete(parseInt(key)); // 3. 삭제하기
        objStoreRequest.onsuccess = (e) => {
          console.log("delete DONE!!");
          resolve(200);
        };
      };
    }).then((result) => {
      return result;
    });
  }

  updatePlayListId(palyList) {
    return new Promise((resolve) => {
      const request = window.indexedDB.open("mmm");
      request.onerror = (e) => console.log(e.target.errorCode);
      request.onsuccess = (e) => {
        const db = request.result;
        const transaction = db.transaction("mmmAudio", "readwrite");
        transaction.onerror = (e) => reject(console.log("fail"));
        transaction.oncomplete = (e) => console.log("success");

        const objStore = transaction.objectStore("mmmAudio");

        objStore.openCursor().onsuccess = (e) => {
          const cursor = e.target.result;

          if (cursor) {
            if (cursor.key === Number(palyList.key)) {
              if (cursor.value.id !== Number(palyList.id)) {
                const updateData = cursor.value;
                updateData.id = Number(palyList.id);

                const request = cursor.update(updateData);
              }
            }
            cursor.continue();
          } else {
            resolve(200);
          }
        };
      };
    });
  }
}
