
new Vue({
	el: '#crud',
	created: function() {
		this.getKeeps();
	},
	data: {
		keeps: []
	},
	methods: {
		getKeeps: function() {
			var urlKeeps = 'tasks';
			axios.get(urlKeeps).then(response => {
				this.keeps = response.data
			});
		}
	}
});