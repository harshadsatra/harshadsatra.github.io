	
const _ArrNoDupe = (a) => {
    const temp = {};
    for (var i = 0; i < a.length; i++) temp[a[i]] = true;
    const r = [];
    for (const k in temp) r.push(k);
    return r;
};
const _isValue = (value, def, is_return) => {
    if ($.type(value) === 'null' ||
        $.type(value) === 'undefined' ||
        $.trim(value) === '' ||
        ($.type(value) === 'number' && !$.isNumeric(value)) ||
        ($.type(value) === 'array' && value.length === 0) ||
        ($.type(value) === 'object' && $.isEmptyObject(value))) {
        return ($.type(def) !== 'undefined') ? def : false;
    } else {
        return $.type(is_return) === "boolean" && is_return === true ? value : true;
    }
}

const _groupBy = function (arr, criteria) {
	return arr.reduce(function (obj, item) {

		// Check if the criteria is a function to run on the item or a property of it
		var key = typeof criteria === 'function' ? criteria(item) : item[criteria];

		// If the key doesn't exist yet, create it
		if (!obj.hasOwnProperty(key)) {
			obj[key] = [];
		}

		// Push the value to the object
		obj[key].push(item);

		// Return the object to the next item in the loop
		return obj;

	}, {});
};

const _arrayReverseObj = (obj) => {
    let newArray = []
  
    Object.keys(obj)
      .sort()
      .reverse()
      .forEach(key => {
        console.log(key)
        newArray.push( {
        'key':key, 
        'id':obj[key].id
        })
      })
  
    console.log(newArray)
    return newArray  
  }

const app = new Vue({
    el: "#projects",
    data: {
        projects: [],
        apikey: "keykHD6CWKJ8mnEw3",
        yearly: [],
    },
    created() {
        const self = this;
        fetch("https://api.airtable.com/v0/appIi5FTmwENZl1R6/Portfolio?api_key="+ self.apikey)
            .then((response) => response.json())
            .then((responseData) => {
                self.projects =  responseData.records.map((items) => {
                    console.log()
                    items.fields.tagList = items.fields.Tags.join();
                    return items.fields;
                });

                self.yearly = _groupBy(self.projects, 'Year');
                // self.yearly = _arrayReverseObj(self.yearly);
            });
    },
    computed: {
        filteredProjects: function() {
            const self = this;
            return self.projects;
        },
    },
    methods: {
        
    },
});