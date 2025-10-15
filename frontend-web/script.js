new Vue({
    el: '#app',
    data: {
        isLoggedIn: false,
        loginForm: {
            username: '',
            password: ''
        },
        loginError: '',
        currentView: 'perkara',
        menu: [
            { id: 'perkara', label: 'Kelola Perkara' },
            { id: 'pegawai', label: 'Kelola Pegawai' },
            { id: 'laporan', label: 'Kelola Laporan' },
        ],
        perkaraStats: {
            totalKasus: 0,
            kasusAktif: 0,
            kasusSelesai: 0,
            persentasePenyelesaian: '0%'
        },
        table: null,
        selectedRow: null,
        modalVisible: false,
        modalMode: 'add',
        modalData: {},
        searchQuery: '',
        currentPage: 1,
        pageSize: 5,
        // Columns and URLs for each view
        viewsConfig: {
            pegawai: {
                columns: [
                    { title: "ID", field: "id", width: 60 },
                    { title: "Name", field: "name" },
                    { title: "Age", field: "age", hozAlign: "center" },
                    { title: "Gender", field: "gender" }
                ],
                url: "http://localhost:8000/api/pegawai",
                defaultData: { name: '', age: 0, gender: 'Male' }
            },
            perkara: {
                columns: [
                    { title: "ID", field: "id", width: 60 },
                    { title: "Judul", field: "judul" },
                    { title: "Tanggal", field: "tanggal", hozAlign: "center" },
                    { title: "Status", field: "status" }
                ],
                url: "http://localhost:8001/api/perkara",
                defaultData: { judul: '', tanggal: '', status: '' }
            }
        }
    },
    watch: {
        currentView(val) {
            this.$nextTick(() => {
                const config = this.viewsConfig[val];

                if(!config) {
                    console.error("No configuration found for view:", val);
                    return;
                }
                this.initTabulator(`#${this.currentView}-table`, config.url, config.columns);
            });
        },
        searchQuery() {
            this.currentPage = 1;
            this.refreshTable();
        },
        currentPage() {
            this.refreshTable();
        }
    },
    methods: {
        async handleLogin() {
            try {
                const response = await fetch('http://localhost:8003/api/auth/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(this.loginForm)
                });

                if (!response.ok) throw new Error('Invalid credentials');

                const data = await response.json();
                localStorage.setItem('token', data.token);
                this.isLoggedIn = true;
                this.loginError = '';

                setTimeout(() => {
                    this.initializeApp();
                }, 50);
            } catch (error) {
                this.loginError = error.message;
            }
        },

        getAuthHeaders() {
            return {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            };
        },

        async initTabulator(elementId, ajaxURL, columns) {
            if (this.table) this.table.destroy();
            this.table = new Tabulator(elementId, {
                ajaxURL: ajaxURL,
                ajaxParams: {
                    search: this.searchQuery,
                    page: this.currentPage
                },
                ajaxConfig: {
                    headers: this.getAuthHeaders(),
                    method: "GET"
                },
                columns: columns,
                layout: "fitDataFill",
                height: "100%",
                rowHeight: 50,
                selectableRows: 1,
                pagination: true,
                paginationMode: "remote",
                paginationSizeSelector: [5, 10, 15, 20],
                paginationSize: this.pageSize,
                paginationInitialPage: this.currentPage,
                paginationCounter: "rows"
            });

            const vm = this; // Vue instance reference
            this.table.on("rowSelected", function(row) {
                vm.selectedRow = row.getData();
            });
            this.table.on("rowDeselected", function(row) {
                vm.selectedRow = null;
            });
        },
        refreshTable() {
            const config = this.viewsConfig[this.currentView];
            this.initTabulator(`#${this.currentView}-table`, config.url, config.columns);

            this.fetchPerkaraStats();
        },
        showAddModal() {
            const config = this.viewsConfig[this.currentView];
            this.modalMode = 'add';
            this.modalData = { ...config.defaultData };
            this.modalVisible = true;
        },
        editSelected() {
            if (!this.selectedRow) return alert("Select a row to edit.");
            this.modalMode = 'edit';
            this.modalData = { ...this.selectedRow };
            this.modalVisible = true;
        },
        async deleteSelected() {
            if (!this.selectedRow) return alert("Select a row to delete.");
            if (!confirm(`Hapus ${this.currentView} terpilih ?`)) return;
            const config = this.viewsConfig[this.currentView];
            await fetch(`${config.url}/${this.selectedRow.id}`, { method: "DELETE", headers: this.getAuthHeaders() });
            this.refreshTable();
        },
        async submitModal() {
            const config = this.viewsConfig[this.currentView];
            const url = config.url;

            if (this.modalMode === 'add') {
                await fetch(url, {
                    method: "POST",
                    headers: this.getAuthHeaders(),
                    body: JSON.stringify(this.modalData)
                });
            } else if (this.modalMode === 'edit') {
                await fetch(`${url}/${this.modalData.id}`, {
                    method: "PUT",
                    headers: this.getAuthHeaders(),
                    body: JSON.stringify(this.modalData)
                });
            }
            this.modalVisible = false;
            this.refreshTable();
        },
        async fetchPerkaraStats() {
            const response = await fetch("http://localhost:8001/api/perkara/stats", {
                headers: this.getAuthHeaders()
            });
            const stats = await response.json();
            this.perkaraStats = {
                totalKasus: stats.totalKasus,
                kasusAktif: stats.kasusAktif,
                kasusSelesai: stats.kasusSelesai,
                persentasePenyelesaian: `${stats.persentasePenyelesaian}% selesai`
            };
        },
        logout() {
            localStorage.removeItem('token');
            this.isLoggedIn = false;
            this.loginForm = { username: '', password: '' };
        },
        initializeApp() {
            const config = this.viewsConfig[this.currentView];
            this.initTabulator(`#${this.currentView}-table`, config.url, config.columns);
            this.fetchPerkaraStats();
        }
    },
    ready() {
        const token = localStorage.getItem('token');
        if (token) {
            this.isLoggedIn = true;

            setTimeout(() => {
                this.initializeApp();
                
            }, 50);
        }
    }
});