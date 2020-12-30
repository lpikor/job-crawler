class Company {
    constructor(name, url, id) {
        this.name = name;
        this.url = url;
        this.id = id;
    }
}

class UI {
    static displayCompanies() {
        const companies = Store.getCompanies();

        companies.forEach(company => {
            UI.addCompanyToList(company);
        });
    }

    static addCompanyToList(company) {
        const list = document.querySelector('.companies-list');

        const listItem = document.createElement('li');

        listItem.innerHTML = `
            <a href="${company.url}">${company.name}</a>
            <span style="display:none;">${company.id}</span>
            <button class="remove-company">Remove</button>
        `;

        list.appendChild(listItem);
    }

    static deleteCompany(element) {
        if (element.classList.contains('remove-company')) {
            element.parentElement.remove();
        }
    }

    static clearFields() {
        document.querySelector('#company-name').value = '';
        document.querySelector('#company-url').value = '';
    }
}

class Store {
    static getCompanies() {
        let companies;
        
        if (localStorage.getItem('companies') === null) {
            companies = [];
        } else {
            companies = JSON.parse(localStorage.getItem('companies'));
        }

        return companies;
    }

    static addCompany(company) {
        const companies = Store.getCompanies();

        companies.push(company);

        localStorage.setItem('companies', JSON.stringify(companies));
    }

    static removeCompany(id) {
        const companies = Store.getCompanies();

        companies.forEach((company, index) => {
            if (company.id === id) {
                companies.splice(index, 1);
            }
        });

        localStorage.setItem('companies', JSON.stringify(companies));
    }
}

class Request {
    static sendRequest(target) {
        let request = new XMLHttpRequest();
        request.open('GET', target, false);
        request.send(null);
        return request;
    }
}

// Display Companies
document.addEventListener('DOMContentLoaded', UI.displayCompanies);

// Add a Company
document.querySelector('.add-company').addEventListener('submit', (e) => {
    // Prevent submit
    e.preventDefault();

    // Get form values
    const name = document.querySelector('#company-name').value;
    const url = document.querySelector('#company-url').value;
    const ID = () => {
        return '_' + Math.random().toString(36).substr(2, 9);
    }

    // Instantiate Company
    const company = new Company(name, url, ID());
    console.log(company);

    // Add Company to UI
    UI.addCompanyToList(company);

    // Add Company to Store
    Store.addCompany(company);

    // Clear fields
    UI.clearFields();
});

// Remove a Company
document.querySelector('.companies-list').addEventListener('click', (e) => {
    // Remove Company from Store
    Store.removeCompany(e.target.previousElementSibling.textContent);

    // Remove Company from UI
    UI.deleteCompany(e.target);
})