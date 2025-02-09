document.addEventListener('DOMContentLoaded', function () {
    const userForm = document.getElementById('userForm');
    const userList = document.getElementById('userList');
    const clearFieldsButton = document.getElementById('clearFields');
    const clearAllButton = document.getElementById('clearAll');
    const searchInput = document.getElementById('search');

    loadUsers();

    function loadUsers() {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        userList.innerHTML = '';
        users.forEach((user, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <span>${user.date} - ${user.username} - ${user.email}</span>
                <button onclick="deleteUser(${index})">Excluir</button>
            `;
            userList.appendChild(li);
        });
    }

    userForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const email = document.getElementById('email').value;
        const date = new Date().toLocaleString();

        const user = { username, email, date };
        const users = JSON.parse(localStorage.getItem('users')) || [];
        users.push(user);
        localStorage.setItem('users', JSON.stringify(users));

        loadUsers();
        userForm.reset();
    });

    clearFieldsButton.addEventListener('click', function () {
        userForm.reset();
    });

    clearAllButton.addEventListener('click', function () {
        localStorage.removeItem('users');
        loadUsers();
    });

    window.deleteUser = function (index) {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        users.splice(index, 1);
        localStorage.setItem('users', JSON.stringify(users));
        loadUsers();
    };

    searchInput.addEventListener('input', function () {
        const searchTerm = searchInput.value.toLowerCase();
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const filteredUsers = users.filter(user => 
            user.username.toLowerCase().includes(searchTerm) || 
            user.email.toLowerCase().includes(searchTerm)
        );

        userList.innerHTML = '';
        filteredUsers.forEach((user, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <span>${user.date} - ${user.username} - ${user.email}</span>
                <button onclick="deleteUser(${index})">Excluir</button>
            `;
            userList.appendChild(li);
        });
    });
});