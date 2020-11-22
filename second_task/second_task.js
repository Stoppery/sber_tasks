const pg = require('pg');
const data = require('./scim_exampl.json');

let valu = Object.values(data), keyData = Object.keys(data);

const config ={
	user: 'stoppery',
	host: 'localhost',
	database: 'stoppery',
	password: '',
	port: 5432,
};

const schemaName = 'myschema';

//parsing for userTable

function userKeys() {
	let result=[[],[],[],[],[]];

	for (let i = 0; i < valu.length; i++) {
		if (typeof(valu[i]) === 'string') {
			result[0].push(keyData[i]);
			result[1].push(valu[i]);
			if (keyData[i] ==='id') {
				result[4].push(valu[i]);
			}
		}
		else if (typeof(valu[i]) === 'boolean') {
			result[2].push(keyData[i]);
			result[3].push(valu[i]);
		}
	}
	return result;
}


//id = fk_key for tables

let id = userKeys(data)[4];

//parsing for nameTable

function nameKeys() {
	let result=[];
	
	for (let i = 0; i < valu.length; i++) {
		if (keyData[i] ==='name' && typeof(valu[i]) === 'object') {
				result.push(Object.keys(valu[i]));
				result.push(Object.values(valu[i]));
		}
	}
	return result;
}

//parsing for emailsTable

function emailsKeys() {
	let result = [];
	
	for (let i = 0; i < valu.length; i++) {
		if (keyData[i] ==='emails' && typeof(valu[i]) === 'object') {
			for (let j = 0; j < Object.values(valu[i]).length; j++)
			{
				result.push(Object.keys(valu[i][j]));
				result.push(Object.values(valu[i][j]));
			}
		}
	}
	for (let k = 0; k < result.length; k++){
		if ( k % 2 == 0){
			if (result[k].length < 3)
			{
				result[k].push('primar');
			}
			for (let m = 0; m <= result[k].length - 1; m++){
				if (result[k][m] == 'primary'){
					result[k][m] = 'primar';
				}
			}
			result[k] = result[k].join(', ');
			result[k] = result[k].concat(', u_id_fk');
		} else if (k % 2 != 0){
			if (result[k].length < 3){
				result[k].push(false);
			}
			let tmp = '';
			let end = result[k][result[k].length - 1];
			for (let m = 0; m < result[k].length - 1; m++){
				tmp = tmp.concat('\'',result[k][m],'\'',', ');
			}
			result[k] = tmp.concat(end);
			result[k] =result[k].concat(', ','\'',id.join(''),'\'');
		}
	}
	return result;
}

//parsing for addressesTable

function addressesKeys() {
	let result = [];
	
	for (let i = 0; i < valu.length; i++) {
		if (keyData[i] ==='addresses' && typeof(valu[i]) === 'object') {
			for (let j = 0; j < Object.values(valu[i]).length; j++)
			{
				result.push(Object.keys(valu[i][j]));
				result.push(Object.values(valu[i][j]));
			}
		}
	}
	for (let k = 0; k < result.length; k++){
		if ( k % 2 == 0){
			if (result[k].length < 7)
			{
				result[k].push('primar');
			}
			for (let m = 0; m <= result[k].length - 1; m++){
				if (result[k][m] == 'primary'){
					result[k][m] = 'primar';
				}
			}
			let numberName = result[k][3];
			result[k].splice(3,1);
			result[k].push(numberName);
			result[k] = result[k].join(', ');
			result[k] = result[k].concat(', u_id_fk');
		} else if (k % 2 != 0){
			if (result[k].length < 7){
				result[k].push(false);
			}
			let tmp = '';
			let end = result[k][result[k].length - 1];
			let numberRes = result[k][3];
			result[k].splice(3,1);
			result[k].push(numberRes);
			for (let m = 0; m < result[k].length - 2; m++){
				tmp = tmp.concat('\'',result[k][m],'\'',', ');
			}
			result[k] = tmp.concat(end,', ',numberRes);
			result[k] = result[k].concat(', ','\'',id.join(''),'\'');
		}
	}
	return result;
}

//parsing for phoneTable

function phoneKeys() {
	let result = [];

	for (let i = 0; i < valu.length; i++) {
		if (keyData[i] ==='phoneNumbers' && typeof(valu[i]) === 'object') {
			for (let j = 0; j < Object.values(valu[i]).length; j++)
			{
				result.push(Object.keys(valu[i][j]));
				result.push(Object.values(valu[i][j]));
			}
		}
	}
	for (let j = 0; j < result.length; j++) {
		if (j % 2 == 0) {
			result[j].push('u_id_fk');
			result[j] = result[j].join(', ');
		} else {
			let tmp = '';
			for (let m = 0; m < result[j].length; m++) {
				tmp = tmp.concat('\'',result[j][m],'\'',', ');
			}
			result[j] = tmp.concat('\'',id.join(''),'\'');
		}
		
	}
	return result;
}

//for table USER

let userNameTableString = userKeys(data)[0].concat(userKeys(data)[2]).join(', ');
let userDataTableString = '\''.concat(userKeys(data)[1].join('\', \''), '\'').concat(', ',userKeys(data)[3].join(', '));

// for table NAME

let nameName = nameKeys(data)[0].join(', ').concat(', u_id_fk');
let nameData = '\''.concat(nameKeys(data)[1].join('\', \''),'\'').concat(', ','\'',id.join(''),'\'');




// connecting to db and calling functions for filling db

const client = new pg.Client(config);
client.connect(err => {
    if (err) {
		throw err;
	}
	else { 
		let tmp = 1;
		let flag = '';
		if (userNameTableString && userDataTableString){
			flag = 'users';
			queryTable(flag, userNameTableString, userDataTableString);
		}
		if (nameKeys(data)[0] && nameKeys(data)[1]){
			flag = 'name';
			queryTable(flag, nameName, nameData);
		}
		if (emailsKeys().length > 1){
			tmp = 1;
			flag = 'emails';
			for (let i = 0; i < emailsKeys().length - 1; i= i+2){
				queryFk(flag,tmp,emailsKeys()[i],emailsKeys()[i+1]);
				tmp++;
			}
		}
		if (addressesKeys().length > 1){
			tmp = 1;
			flag = 'addresses'
			for (let i = 0; i < addressesKeys().length - 1; i= i+2){
				queryFk(flag,tmp,addressesKeys()[i],addressesKeys()[i+1]);
				tmp++;
			}
		}
		if (phoneKeys().length > 1){
			tmp = 1;
			flag = 'phoneNumbers';
			for (let i = 0; i < phoneKeys().length - 1; i= i+2){
				queryFk(flag,tmp,phoneKeys()[i],phoneKeys()[i+1]);
				tmp++;
			}
		}
		end();
	}
});



//functions for filling tables

function queryTable(flag, tableСolumn, tableData) {
	client
		.query(`INSERT INTO ${schemaName}.${flag.toLowerCase()} (${tableСolumn})  VALUES (${tableData})`) 
        .then(() => {
			console.log(`Table ${flag.toUpperCase()} was filled`);
		})
        .catch(err => console.log(err))
        .then(() => {
            console.log('Finished execution, exiting now');
        });
}

function queryFk(flag,tmp,name, data) {
	client
		.query(`INSERT INTO ${schemaName}.${flag.toLowerCase()} (id,${name}) VALUES (${'\''.concat(id.toString(),'.',tmp,'\'')},${data})`) 
        .then(() => {
			console.log(`Table ${flag.toUpperCase()} was filled`);
		})
        .catch(err => console.log(err))
        .then(() => {
            console.log('Finished execution, exiting now');
        });
}

function end() {
	client
		.query(`;`)
		.then(() =>{
			console.log('Finish connection to DB');
			client.end();
		})
		.catch(err => console.log(err))
		.then(()=>{
			console.log('Program finished');
			process.exit();
		});
}