document.addEventListener('DOMContentLoaded', function () {
    const userForm = document.getElementById('userForm');
    const userList = document.getElementById('userList');
    const clearFieldsButton = document.getElementById('clearFields');
    const clearAllButton = document.getElementById('clearAll');
    const searchInput = document.getElementById('search');

    // Carregar usuários do Local Storage ao carregar a página
    loadUsers();

    // Função para carregar usuários do Local Storage
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

    // Função para adicionar um novo usuário
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

    // Função para limpar campos do formulário
    clearFieldsButton.addEventListener('click', function () {
        userForm.reset();
    });

    // Função para excluir todos os usuários
    clearAllButton.addEventListener('click', function () {
        localStorage.removeItem('users');
        loadUsers();
    });

    // Função para excluir um usuário específico
    window.deleteUser = function (index) {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        users.splice(index, 1);
        localStorage.setItem('users', JSON.stringify(users));
        loadUsers();
    };

    // Função para pesquisar usuários
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