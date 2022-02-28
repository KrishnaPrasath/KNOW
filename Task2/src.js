const sample = {
  employee: { name: { first: "A", last: "B" } },
  age: 30,
  knownLanguages: ["Telugu", "English"],
};

const sample2 = {
	"id": "0001",
	"type": "donut",
	"name": "Cake",
	"ppu": 0.55,
	"batters":
		{
			"batter":
				[
					{ "id": "1001", "type": "Regular" },
					{ "id": "1002", "type": "Chocolate" },
					{ "id": "1003", "type": "Blueberry" },
					{ "id": "1004", "type": "Devil's Food" }
				]
		},
	"topping":
		[
			{ "id": "5001", "type": "None" },
			{ "id": "5002", "type": "Glazed" },
			{ "id": "5005", "type": "Sugar" },
			{ "id": "5007", "type": "Powdered Sugar" },
			{ "id": "5006", "type": "Chocolate with Sprinkles" },
			{ "id": "5003", "type": "Chocolate" },
			{ "id": "5004", "type": "Maple" }
		]
}

const setKeyValue = (object, key, value) => {
	object["key"] = key;
	object["value"] = value;
	return object;
}

const flattenObject = (obj) => {
  let resultObject = [], keyHolder = [];
	const KEYS = Object.keys(obj);
	KEYS.forEach(key => {
		let item = obj[key];
		if(typeof item === "object" && !Array.isArray(item)){
			keyHolder.push(key);
			let fObj = flattenObject(item);
			fObj.map( ob =>
				{console.log(ob);
                // Store temp in result
                // resultObject.push({key: [i + '.' + j], value: temp[j]});
				})
		}else{
			keyHolder.push(key);
			resultObject.push({key: keyHolder.join("."), value:item});
			keyHolder = []
		}
	})
	return resultObject;
};

const flattenObject_two = (obj, keys = []) => {
	return Object.keys(obj).map(key =>{
		const value = obj[key];
		if(typeof value === 'object' && !Array.isArray(value)){
			keys.push(key);
			let response = flattenObject_two(value, keys);
			// console.log(response);
		}
		console.log("keys", keys)
		let temp = keys.length > 0 ? keys.join(".") : key;
		keys = Object.keys(value).length > 0 ? keys.slice(0, -1) : [];
		return {key: temp, value};
		
	})
}

let res = flattenObject_two(sample);
console.log(JSON.stringify(res));
