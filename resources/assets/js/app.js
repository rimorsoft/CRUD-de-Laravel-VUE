new Vue({
    name: 'Crud',
    el: '#crud',
    created () {
        this.getKeeps(1)
    },
    data: {
        keeps: [],
        pagination: {},
        newKeep: '',
        fillKeep: {id: '', keep: ''},
        errors: '',
        offset: 3,
    },
    computed: {
        isActived () {
            return this.pagination.current_page
        },
        pagesNumber () {
            if(!this.pagination.to) {
                return []
            }

            var from = this.pagination.current_page - this.offset
            if(from < 1) {
                from = 1
            }

            var to = from + (this.offset * 2)
            if(to >= this.pagination.last_page) {
                to = this.pagination.last_page
            }

            var pagesArray = []
            while(from <= to) {
                pagesArray.push(from)
                from++
            }

            return pagesArray
        }
    },
    methods: {
        getKeeps (page) {
            axios.get(`api/tasks?page=${page}`)
                .then(response => {
                    this.keeps = response.data.tasks.data,
                        this.pagination = response.data.pagination
                })
                .catch((error) => { console.log(error) })
        },
        editKeep (keep) {
            this.fillKeep.id   = keep.id;
            this.fillKeep.keep = keep.keep;
            $('#edit').modal('show');
        },
        updateKeep (id) {
            axios.put(`api/tasks/${id}`, this.fillKeep)
                .then(response => {
                    this.getKeeps()
                    this.fillKeep = { 'id': '', 'keep': '' }
                    this.errors	  = []
                    $('#edit').modal('hide')
                    toastr.success(response.data.message)
                }).catch(error => {
                    this.errors = 'Corrija para poder editar con éxito'
                })
        },
        deleteKeep (keep) {
            axios.delete(`api/tasks/${keep.id}`)
                .then(response => { //eliminamos
                    this.getKeeps() //listamos
                    toastr.success(response.data.message) //mensaje
                })
                .catch(error => { console.log(error) })
        },
        createKeep () {
            axios.post(`api/tasks`, { keep: this.newKeep })
                .then(response => {
                    this.getKeeps()
                    this.newKeep = ''
                    this.errors = []
                    $('#create').modal('hide')
                    toastr.success(response.data.message)
                }).catch(error => {
                    this.errors = 'Corrija para poder crear con éxito'
                })
        },
        changePage (page) {
            this.pagination.current_page = page
            this.getKeeps(page)
        }
    }
});

