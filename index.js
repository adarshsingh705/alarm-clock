const selectTime = document.querySelectorAll("select");
const currTime = document.querySelector("span");
let alarms = [];
let alaramCounter = 0;
let alaramTime;
let alaramTone = new Audio(
  "david-guetta-feat-ne-yo-akon-play-hard-mp3cut-net-17270.mp3"
);

let alarmTimeMatch = false;

for (let i = 12; i > 0; i--) {
  i = i < 10 ? "0" + i : i;
  let option = `<option value=${i}>${i}</option>`;
  selectTime[0].firstElementChild.insertAdjacentHTML("afterend", option);
}

for (let i = 59; i > -1; i--) {
  i = i < 10 ? "0" + i : i;
  let option = `<option value=${i}>${i}</option>`;
  selectTime[1].firstElementChild.insertAdjacentHTML("afterend", option);
}

for (let i = 2; i > 0; i--) {
  let amPm = i == 1 ? "AM" : "PM";
  let option = `<option value=${amPm}>${amPm}</option>`;
  selectTime[2].firstElementChild.insertAdjacentHTML("afterend", option);
}

//Display time
gettime = () => {
  let d = new Date();
  let h = d.getHours();

  let amPm = h >= 12 ? "PM" : "AM";

  h = h % 12;
  h = h == 0 ? 12 : h;
  h = h > 9 ? h : "0" + h;

  let m = d.getMinutes();
  m = m > 9 ? m : "0" + m;

  let s = d.getSeconds();
  s = s > 9 ? s : "0" + s;

  for (let i = 0; i < alarms.length; i++) {
    if (alarms[i] == `${h}:${m} ${amPm}`) {
      console.log("Alarm ringing...");
      // alaramTone.load();
      alarmTimeMatch = true;
      if ((alarmTimeMatch = true)) {
        alaramTone.play();
      }
    }
  }
  return `${h} : ${m} : ${s}  ${amPm}`;
};
// console.log(gettime());
setInterval(() => {
  let t = gettime();
  let clock = document.querySelector(".clock");
  clock.innerHTML = t;
}, 1000);

//   set alarm

function setAlarm() {
  let time = `${selectTime[0].value}:${selectTime[1].value} ${selectTime[2].value}`;
  if (time.includes("Hour") || time.includes("Min") || time.includes("AM/PM")) {
    return alert("Please select a valid time");
  } else {
    alaramCounter++;
    document.querySelector(".alarmList").innerHTML += `
  <div class="alaramLog" id="alarm${alaramCounter}">
    <span id="span${alaramCounter}">${time}</span>
    <button class="btn-delete" id="${alaramCounter}" onClick="deleteAlarm(this.id)">Delete Alarm</button>
  </div>`;

    alaramTime = `${selectTime[0].value}:${selectTime[1].value} ${selectTime[2].value}`;
    console.log(alaramTime);
    alarms.push(alaramTime);
    console.log(document.querySelector(".btn-delete").value);
  }
}

function deleteAlarm(click_id) {
  var alarmsEle = document.getElementById("alarm" + click_id);
  console.log(alarmsEle);
  var deleteIndex = alarms.indexOf(
    document.querySelector("#span" + click_id).innerText
  );
  alarms.splice(deleteIndex, 1);
  alaramTone.pause();
  alarmsEle.remove();
}

