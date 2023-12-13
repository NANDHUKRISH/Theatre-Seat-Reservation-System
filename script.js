// Reserved Seat Object
var reservedSeats = {
    detail1: {
        seat: 'B6',
        owner: {
            name: 'ANandhu',
            MobNo: 26242155,
        },
    },
    detail2: {
        seat: 'B7',
        owner: {
            name: 'ANandhu',
            MobNo: 262584122,
        },
    },
    detail3: {
        seat: 'B8',
        owner: {
            name: 'Nandhu',
            MobNo: 20256894,
        },
    },
    detail4: {
        seat: 'B9',
        owner: {
            name: 'Nandhu',
            MobNo: 2023564896,
        },
    },
    detail5: {
        seat: 'B10',
        owner: {
            name: 'Nandhu',
            MobNo: 20258642,
        },
    },
    detail6: {
        seat: 'G14',
        owner: {
            name: 'Sanu',
            MobNo: 28236958,
        },
    },
    detail7: {
        seat: 'G15',
        owner: {
            name: 'Sanu',
            MobNo: 28895642,
        },
    },
    detail8: {
        seat: 'G16',
        owner: {
            name: 'Sanu',
            MobNo: 28245862,
        },
    },
};

/* 
        const rows=["A","B","C"];  // ,"E","F","G","H","I","J","K","L","M","N","O"

        // Adding Left side seats
                let html="";
                let counter=1;

                rows.forEach(row=>{
                    html+=`<div class="label">${row}</div>`;
                    for(let i=0; i<4; i++){
                    html+=`<div class="seat" id=${row+counter}>${counter}</div>`;
                    counter++;
                    }
                    counter=counter+14;
                });

              //  document.getElementById("left").innerHTML=html;

        // Adding Right side seats
                html="";
                counter=1;

                rows.forEach(row=>{
                    counter=counter+14;
                    for(let i=0; i<4; i++){
                    html+=`<div class="seat" id=${row+counter}>${counter}</div>`;
                    counter++;
                    }
                    html+=`<div class="label">${row}</div>`;
                    
                });

                document.getElementById("right").innerHTML=html;

        // Adding Middle Seats

                html="";
                counter=1;

                rows.forEach(row=>{
                    counter=counter+4
                for(let i=0; i<10; i++){
                    html+=`<div class="seat" id=${row+counter}>${counter}</div>`;
                    counter++;
                }
                    counter=counter+4;
                });

                document.getElementById("middle").innerHTML=html; */

// Function to add new row shorted code with switch

function makeRows(sectionLength, rowLength, placement) {
    const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R'];
    let html = '';
    let counter = 1;

    if (placement == 'middle') {
        document.getElementById(placement).style = `grid-template-columns: repeat(${sectionLength}, 1fr)`;
    } else {
        document.getElementById(placement).style = `grid-template-columns: repeat(${sectionLength + 1}, 1fr)`;
    }
    rows.forEach((row) => {
        counter = 1;
        switch (placement) {
            case 'left':
                html += `<div class="label">${row}</div>`;
                break;
            case 'right':
                counter = counter + (rowLength - sectionLength);
                break;
            default:
                counter = counter + (rowLength - sectionLength) / 2;
                break;
        }

        for (let i = 0; i < sectionLength; i++) {
            html += `<div class="seat available" id="${row + counter}">${counter}</div>`;
            counter++;
        }

        switch (placement) {
            case 'left':
                counter = counter + (rowLength - sectionLength);
                break;
            case 'right':
                html += `<div class="label">${row}</div>`;
                break;
            default:
                counter = counter + (rowLength - sectionLength) / 2;
                break;
        }
    });
    //console.log(html);
    document.getElementById(placement).innerHTML = html;
}

makeRows(5, 18, 'left');
makeRows(5, 18, 'right');
makeRows(8, 18, 'middle');

// looping the ReservedSeat object

(function () {
    'use strict';

    let SelectedSeat = [];
    const seats = document.querySelectorAll('.available');
    let DateArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31,];
    let MonthArray = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    let dayArray = ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'];

    let today = new Date();
    let yesterday = today.setDate(today.getDate() - 1);
    let tomorrow = today.setDate(today.getDate() + 1);
    // Adding color to the reserved seats
    for (let key in reservedSeats) {
        if (reservedSeats.hasOwnProperty(key)) {
            let obj = reservedSeats[key];
            document.getElementById(obj.seat).innerHTML = 'R';
            document.getElementById(obj.seat).className = 'seat reserved';
        }
    }

    // Adding Seat name to the array when clicked
   
    seats.forEach((seat) => {
        seat.addEventListener('click', () => {
            SeatSelectionProcess(seat.id);
        });
    });

    // SeatSelectionProcess function

    function SeatSelectionProcess(seatid) {
        if (!document.getElementById(seatid).classList.contains('reserved')) {
            var index = SelectedSeat.indexOf(seatid);
            if (index > -1) {
                SelectedSeat.splice(index, 1);
                document.getElementById(seatid).className = 'seat available';
            } else {
                SelectedSeat.push(seatid);
                document.getElementById(seatid).className = 'seat selected';
            }
            if (SelectedSeat.length >= 0) {
                document.querySelector('.count').innerHTML = SelectedSeat.length;
                document.querySelector('.amount').innerHTML = SelectedSeat.length * 130;
            }
        }
    }

    // Adding date and time
    function AddDateTime(className) {
        let dates = document.querySelectorAll(`.${className}`);
        dates.forEach((date) => {
            date.addEventListener('click', () => {
                if (date.className == `${className}`) {
                    changebackGround(className);
                    date.className = `${className} checked`;
                } else {
                    date.className = `${className}`;
                }
            });
        });

        function changebackGround(className) {
            let dates = document.querySelectorAll(`.${className}`);
            dates.forEach((date) => {
                date.className = `${className}`;
            });
        }
    }
    /* AddDateTime("dates-item"); */
    AddDateTime('time');

    // Event Listener to open the book ticket form
    document.querySelector('.BookButton').addEventListener('click', (e) => {
        e.preventDefault();
        manageConfirmForm();
        document.querySelector('.ticket-Form').style.display = 'block';
        document.querySelector('.SeatReservationSystem').style.filter = 'blur(5px)';
    });

    // Event Listener to close the book ticket form
    document.querySelector('.to-cancel').addEventListener('click', (e) => {
        e.preventDefault();
        document.querySelector('.ticket-Form').style.display = 'none';
        document.querySelector('.SeatReservationSystem').style.filter = 'none';
    });

    // function to check if seats selected or not , if not reservation form will not be shown
    function manageConfirmForm() {
        let ShowTimes=document.querySelectorAll('.time');
        let bookedTime;
            ShowTimes.forEach(eachtime=>{
                            if(eachtime.classList.contains("checked")){
                               bookedTime=eachtime.innerText;
                            }               
                        });
        let bookedmonth=document.querySelector('.month').innerText;
        let bookeddate=document.querySelector('.date').innerText;
        if (SelectedSeat.length > 0 && bookedTime) {
            document.querySelector('.NoseatSelected').style.display = 'none';
            document.querySelector('.card-content form').style.display = 'block';
            document.querySelector('.BookedDate').innerText = bookedmonth +" "+ bookeddate;
            document.querySelector('.BookedTime').innerText = bookedTime;
            let seatsString = SelectedSeat.toString();
            seatsString = seatsString.replace(/,/g, ', ');
            if (SelectedSeat.length === 1) {
                document.querySelector('.form-row b').innerText = `Seat : ${SelectedSeat[0]}`;
            } else {
                document.querySelector('.form-row b').innerText = `Seats : ${seatsString}`;
            }
        } else if(SelectedSeat.length == 0 && bookedTime){
            document.querySelector('.card-content form').style.display = 'none';
            document.querySelector('.NoseatSelected').innerHTML='You have not selected any Seats';
            document.querySelector('.NoseatSelected').style.display = 'flex';
           
        }else if(SelectedSeat.length>0 && !bookedTime){
            document.querySelector('.card-content form').style.display = 'none';
            document.querySelector('.NoseatSelected').innerHTML = 'You have not selected the Time'; 
            document.querySelector('.NoseatSelected').style.display = 'flex'; 
        }else{
            document.querySelector('.card-content form').style.display = 'none';
            document.querySelector('.NoseatSelected').innerHTML = 'You have not selected the Seats & Time'; 
            document.querySelector('.NoseatSelected').style.display = 'flex';
        }
    }

    // Date Rotating Function
    document.querySelector('.month').innerText = MonthArray[new Date().getMonth()];
    document.querySelector('.date').innerText = new Date().getDate();
    document.querySelector('.day').innerText = dayArray[new Date().getDay()];

    function DateRotator(date) {
        const options = {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        };
        const dateTimeFormat = new Intl.DateTimeFormat('en-US', options);
        const parts = dateTimeFormat.formatToParts(date);
        const partValues = parts.map(p => p.value);
        //console.log(partValues[0].slice(0,3),partValues[2].slice(0,3),partValues[4]);
        document.querySelector('.dateAndday>:first-child').remove();
        document.querySelector('.month').innerText = partValues[2].slice(0, 3);
        let adddiv = document.createElement('div'); // new div for appending to the div
        let datehtml = `<input type="radio" class="datesInput" name="date" id="d${partValues[4]}">
            <label for="d${partValues[4]}" class="dates-item">
              <div class="day">${partValues[0].slice(0, 3)}</div>
              <div class="date">${partValues[4]}</div>
            </label>`;
        adddiv.innerHTML = datehtml;
        document.querySelector('.dateAndday').append(adddiv);
    }
    // Functioning the Date Rotating right button
    document.querySelector('.rightbutton').addEventListener('click', e=> {
        let monthname = document.querySelector('.month').innerHTML; // taking current month
        let monthno = MonthArray.indexOf(monthname) + 1; // month in no.
        let dayno = document.querySelector('.date').innerHTML; // current day
        //console.log(monthno,dayno,monthname);
        const date = new Date(`${MonthArray[monthno - 1]} ${DateArray[dayno - 1]} 2023`);
        today = date;
        tomorrow = today.setDate(today.getDate() + 1);
        DateRotator(date);
        e.preventDefault();
    });
    // Functioning the Date Rotating left button
    document.querySelector('.leftbutton').addEventListener('click',e => {
        let monthname = document.querySelector('.month').innerHTML; // taking current month
        let monthno = MonthArray.indexOf(monthname) + 1; // month in no.
        let dayno = document.querySelector('.date').innerHTML; // current day

        const date = new Date(`${MonthArray[monthno - 1]} ${DateArray[dayno - 1]} 2023`);
        today = date;
        yesterday = today.setDate(today.getDate() - 1);
        DateRotator(yesterday);
        e.preventDefault();
    });

    document.querySelector('form').addEventListener('submit',e=>{
        e.preventDefault();
        processReservation();
    });

    function processReservation() {
        const hardCoderecords = Object.keys(reservedSeats).length;
        const Fullname = document.getElementById('fullname').value;
        const Mobno = document.getElementById('mobno').value;
        let counter = 1;
        let nextRecord = '';

        SelectedSeat.forEach(thisseat => {
            // change the innertext to R
            document.getElementById(thisseat).innerHTML = 'R';
            // change class from selected to reserved
            document.getElementById(thisseat).className = 'seat reserved';
            // Add the details to the object
            nextRecord = `detail${hardCoderecords + counter}`;
            reservedSeats[nextRecord] = {
                seat: thisseat,
                owner: {
                    name: Fullname,
                    MobNo: Mobno,
                },
            };
            counter++;
        });

        // clean up
        document.querySelector('.ticket-Form').style.display = 'none';
        document.querySelector('.SeatReservationSystem').style.filter = 'none';
        SelectedSeat = [];
        document.getElementById("detailForm").reset();
        document.querySelector('.time.checked').className="time";
    }

})();
