var starting = {
  // the starting work time of 25 minutes
  clockCount: 1500,
  clock: 1500,
  progClock: 1500,
  //the starting break time of 5 minutes
  bClock: 300,
  bClockCount: 300,
  progBClock: 300,
  status: "resting"
};

//the object to represent the work clock
var mainClock = {
  changeTime: function (targetID) {
    if (targetID === "wPlus") {
      starting.clockCount += 60;
      starting.clock = starting.clockCount;
      starting.progClock = starting.clockCount;
      document.getElementById("wMin").value = starting.clock / 60 + ":" + "00";
    } else if (targetID === "wMinus" && starting.clockCount >= 0) {
      starting.clockCount -= 60;
      starting.clock = starting.clockCount;
      starting.progClock = starting.clockCount;
      document.getElementById("wMin").value = starting.clock / 60 + ":" + "00";
    } else if (targetID === "bPlus") {
      starting.bClockCount += 60;
      starting.bClock = starting.bClockCount;
      starting.progBClock = starting.bClockCount;
      document.getElementById("bMin").value = starting.bClock / 60 + ":" + "00";
    } else if (targetID === "bMinus" && starting.bClockCount > 0) {
      starting.bClockCount -= 60;
      starting.bClock = starting.bClockCount;
      starting.progBClock = starting.bClockCount;
      document.getElementById("bMin").value = starting.bClock / 60 + ":" + "00";
    }
  },
  countDown: function () {
    starting.clock--;
    document.getElementById("progressBar").style.width =
      starting.clock / starting.progClock * 100 + "%";
    if (starting.clock > -1) {
      var minuteDown = Math.floor(starting.clock / 60);
      var secondDown = starting.clock % 60;
      if (starting.clock < 10) {
        document.getElementById("wMin").value =
          minuteDown + ":" + "0" + secondDown;
      } else {
        document.getElementById("wMin").value = minuteDown + ":" + secondDown;
      }
    }
    if (starting.clock === 0 && starting.bClock !== 0) {
      var audio = new Audio(
        "http://www.wavsource.com/snds_2017-05-21_1278357624936861/animals/panther.wav"
      );
      audio.play();

      this.stopClock();
      //insert audio play file here and make sure it plays at 0's
      breakClock.startBreak();
    }
  },
  startClock: function () {
    this.countDownInterval = setInterval(this.countDown.bind(mainClock), 1000);
  },
  stopClock: function () {
    clearInterval(this.countDownInterval);
  },
  clockReset: function () {
    clearInterval(this.countDownInterval);
    breakClock.stopBreak();
    starting.clock = 1500;
    starting.clockCount = 1500;
    starting.bClock = 300;
    starting.bClockCount = 300;
    document.getElementById("wMin").value = "25:00";
    document.getElementById("bMin").value = "5:00";
    document.getElementById("progressBar").style.width = "0%";
  }
}; // end of var mainClock


//the object to represent the break clock
var breakClock = {
  countDown: function () {
    starting.bClock--;
    document.getElementById("progressBar").style.width =
      starting.bClock / starting.progBClock * 100 + "%";
    if (starting.bClock > -1) {
      var bMinute = Math.floor(starting.bClock / 60);
      var bSecond = starting.bClock % 60;
      if (starting.bClock < 10) {
        document.getElementById("bMin").value = bMinute + ":" + "0" + bSecond;
      } else {
        document.getElementById("bMin").value = bMinute + ":" + bSecond;
      }
    }
    if (starting.bClock === 0 && starting.clock === 0) {
      mainClock.clockReset();
    }
  },
  startBreak: function () {
    if (starting.wClock === 0){
    this.breakInterval = setInterval(this.countDown.bind(breakClock), 1000);
    }
  },
  stopBreak: function () {
    clearInterval(this.breakInterval);
  }
}; //end of breakClock
