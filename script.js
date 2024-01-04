const table = document.getElementById("tableBody")

function addRow() {
  // Get input values
  const name = document.getElementById("name").value;
  const date = document.getElementById("date").value;
  const amount = document.getElementById("amount").value;
  
  if (name.trim() === '') {
    alert("Please Write down the location")
    return;
  } else if (date === '') {
    alert("Please Select a date")
    return;
  } else if (amount.trim() === '') {
    alert("Please Select a date")
    return;
  }
  
  // Create new row and cells
  const newRow = document.createElement("tr")
  const cell1 = document.createElement("td")
  const cell2 = document.createElement("td")
  const cell3 = document.createElement("td")
  const cell4 = document.createElement("td")
  
  // Assign new value
  cell1.textContent = name;
  cell2.textContent = date;
  cell3.textContent = "£" + amount;
  cell3.classList.add("amount-input")
  cell4.textContent = "X";
  
  // Append cells to the new row
  newRow.appendChild(cell1);
  newRow.appendChild(cell2);
  newRow.appendChild(cell3);
  newRow.appendChild(cell4);
  
  // Append row to the table
  table.appendChild(newRow);
  saveData()

  const amountInputs = table.getElementsByClassName('amount-input');
  let total = 0;
  
  // Iterate through amount inputs in the table
  for (let i = 0; i < amountInputs.length; i++) {
    const value = parseFloat(amountInputs[i].textContent.replace('£', '')) || 0;
    total += value;
  }
  
  document.getElementById('total').textContent = total.toFixed(2); // Display total with two decimal places
}

// function calculateTotal() {
// }

table.addEventListener("click", function (e) {
  if (e.target.tagName === "TD") {
    const row = e.target.parentElement;
    const amountCell = row.querySelector(".amount-input");
    const amountValue = parseFloat(amountCell.textContent.replace("£", "")) || 0;

    // Get the current total element
    const totalElement = document.getElementById("total");
    let total = parseFloat(totalElement.textContent) || 0;

    // Update the total by subtracting the amountValue
    total -= amountValue;
    totalElement.textContent = total.toFixed(2);

    row.remove();
    saveData();
  }
}, false);


function saveData() {
  localStorage.setItem("data", table.innerHTML);
}

function showTask() {
  table.innerHTML = localStorage.getItem("data");
}
showTask();
