async function loadDashboard() {
  try {
    const usersResponse = await fetch('/users');
    const users = await usersResponse.json();

    const transactionsResponse = await fetch('/transactions');
    const transactions = await transactionsResponse.json();

    const userInfo = document.getElementById('user-info');
    const totalTransactions = document.getElementById('total-transactions');
    const totalAmount = document.getElementById('total-amount');
    const transactionsBody = document.getElementById('transactions-body');

    if (users.length > 0) {
      const user = users[0];
      userInfo.innerHTML = `
        <p><strong>ID:</strong> ${user.id}</p>
        <p><strong>Name:</strong> ${user.name}</p>
        <p><strong>Email:</strong> ${user.email}</p>
      `;
    } else {
      userInfo.textContent = 'No user found.';
    }

    totalTransactions.textContent = transactions.length;

    const sum = transactions.reduce((total, tx) => total + Number(tx.amount), 0);
    totalAmount.textContent = `R${sum.toFixed(2)}`;

    if (transactions.length > 0) {
      transactionsBody.innerHTML = transactions
        .map(
          (tx) => `
            <tr>
              <td>${tx.id}</td>
              <td>${tx.user_id}</td>
              <td>R${Number(tx.amount).toFixed(2)}</td>
              <td>${new Date(tx.created_at).toLocaleString()}</td>
              <td>
                <button onclick="editTransaction(${tx.id}, ${Number(tx.amount)})">Edit</button>
                <button onclick="deleteTransaction(${tx.id})">Delete</button>
              </td>
            </tr>
          `
        )
        .join('');
    } else {
      transactionsBody.innerHTML = `
        <tr>
          <td colspan="5">No transactions found.</td>
        </tr>
      `;
    }

    const chartCanvas = document.getElementById('transactionChart');
    if (chartCanvas) {
      const ctx = chartCanvas.getContext('2d');

      const labels = transactions.map((tx) => `Tx ${tx.id}`);
      const data = transactions.map((tx) => Number(tx.amount));

      if (window.myChart) {
        window.myChart.destroy();
      }

      window.myChart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [
            {
              label: 'Transaction Amount (R)',
              data: data,
              backgroundColor: '#38bdf8',
              borderRadius: 8
            }
          ]
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              labels: {
                color: '#f8fafc'
              }
            }
          },
          scales: {
            x: {
              ticks: {
                color: '#f8fafc'
              },
              grid: {
                color: '#334155'
              }
            },
            y: {
              ticks: {
                color: '#f8fafc'
              },
              grid: {
                color: '#334155'
              }
            }
          }
        }
      });
    }
  } catch (error) {
    console.error('Dashboard load failed:', error);
  }
}

loadDashboard();

const form = document.getElementById('transaction-form');

if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const amount = document.getElementById('amount').value;

    await fetch('/transactions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user_id: 1,
        amount: amount
      })
    });

    location.reload();
  });
}

async function deleteTransaction(id) {
  await fetch(`/transactions/${id}`, {
    method: 'DELETE'
  });

  location.reload();
}

async function editTransaction(id, currentAmount) {
  const newAmount = prompt('Enter new amount:', currentAmount);

  if (!newAmount) return;

  await fetch(`/transactions/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      amount: newAmount
    })
  });

  location.reload();
}
