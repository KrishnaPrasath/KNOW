
window.addEventListener("load", (event) => {
    renderHTMLTable(INPUT, CONFIG)
})

const renderHTMLTable = (input, config) => {
    let table = document.createElement('table');
    renderHeader(table, config)
    renderBody(table, input, config);
    document.body.appendChild(table);
    return true;
}

const formateClassName = (cName) => cName.replace(/\s+/g, '_').toLowerCase();

const renderBody = (table, input, config) => {
    const tBody = document.createElement('tbody');
    let currentOrg = input[0].Organization;
    input.forEach( ip => {
        const tr = document.createElement('tr');
        tr.classList.add(ip.UserId, ip.Organization);
        config.forEach( item => {
            const {Column, Merge} = item;
            if(!Merge){
                tr.appendChild(fillInnerText(ip, item));
            }else {
                const elements = tBody.getElementsByClassName(formateClassName(ip[Column]));
                if(elements.length === 0){
                    tr.appendChild(fillInnerText(ip, item));
                } else {
                    let temp = elements[0];
                    temp.rowSpan  = temp.rowSpan + 1
                }
            }
        });
        tBody.appendChild(tr);
    } )
    table.appendChild(tBody);
}


const fillInnerText = (ip, item) => {
    let td = document.createElement("td");
    td.rowSpan = 1;
    const {Column, HeaderName} = item;
    if(typeof Column === 'string'){
        td.innerHTML = ip[Column];
        td.className = formateClassName(ip[Column]);
    }
    else if(HeaderName === "Date"){
        const {CheckInTime} = ip;
        td.innerHTML = Column({CheckInTime})
    }else if(HeaderName === "Time"){
        const {CheckInTime, CheckOutTime} = ip;
        td.innerHTML = Column({CheckInTime, CheckOutTime})
    }
    return td;
}

const renderHeader = (table, config) => {
    const tHead = document.createElement('thead');
    const tr = document.createElement("tr");
    config.forEach(item => {
        const th = document.createElement('th');
        th.innerHTML = item.HeaderName;
        tr.appendChild(th);
    });
    tHead.appendChild(tr);
    table.appendChild(tHead);
}

const INPUT = [
    {
      Organization: "Google",
      UserId: "akumar",
      UserName: "Ashok Kumar",
      Department: "Sales",
      Designation: "Sales",
      CheckInTime: 1548909000000,
      CheckOutTime: 1548945000000,
    },
    {
      Organization: "Google",
      UserId: "akumar",
      UserName: "Ashok Kumar",
      Department: "Sales",
      Designation: "Sales",
      CheckInTime: 1549081800000,
      CheckOutTime: 1549110600000,
    },
    {
      Organization: "FB",
      UserId: "phanis",
      UserName: "Phani Sai",
      Department: "Sales",
      Designation: "Sales",
      CheckInTime: 1548909000000,
      CheckOutTime: 1548945000000,
    },
    {
      Organization: "FB",
      UserId: "phanis",
      UserName: "Phani Sai",
      Department: "Sales",
      Designation: "Sales",
      CheckInTime: 1549081800000,
      CheckOutTime: 1549110600000,
    },
    {
      Organization: "FB",
      UserId: "lakshmig",
      UserName: "Laskhmi Gayathri",
      Department: "Quality",
      Designation: "QA Engineer",
      CheckInTime: 1549081800000,
      CheckOutTime: 1549110600000,
    },
    {
      Organization: "FB",
      UserId: "lakshmig",
      UserName: "Laskhmi Gayathri",
      Department: "Quality",
      Designation: "QA Engineer",
      CheckInTime: 1549081800000,
      CheckOutTime: 1549110600000,
    },
  ];
  
  const CONFIG = [
    { HeaderName: "Organization", Column: "Organization", Merge: true },
    {
      HeaderName: "Department",
      Column: "Department",
      Merge: true,
    },
    {
      HeaderName: "UserName",
      Column: "UserName",
      Merge: true,
    },
    {
      HeaderName: "Date",
      Column: ({ CheckInTime }) => {
        return moment(CheckInTime).format("DD/MM/YYYY");
      },
      Merge: false,
    },
    {
      HeaderName: "Time",
      Column: ({ CheckInTime, CheckOutTime }) => {
        // Column can be a string or callback which can be called with the specific row record to get the computed column value.
        const secs = (CheckOutTime - CheckInTime) / 1000;
        // TODO: Return in (x Hrs y Mins) format.
        return secs / 60 + " Mins"; // Returning in minutes
      },
      Merge: false,
    },
  ];
  
