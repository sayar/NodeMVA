// import the language driver
var MongoClient = require('mongodb').MongoClient
	, assert = require('assert');
var ObjectID = require('mongodb').ObjectID;

// Connection URL for local mongodb server
var url = 'mongodb://127.0.0.1:27017/test';

// Use connect method to connect to the Server
MongoClient.connect(url, function (err, db) {
	//ensure we've connected
	assert.equal(null, err);

	var bankData = db.collection('bank_data');

	bankData.insertOne({
		first_name: "Rami",
		last_name: "Sayar",
		accounts: [
			{
				account_balance: "50000000",
				account_type: "Investment",
				currency: "USD"
			}]
	}, function (err, op_result) {

		if (err) {
			return console.error(err);
		}

		console.log('inserted:');
		console.log(op_result.ops[0]);

		var updatedPerson = op_result.ops[0];
		updatedPerson.accounts[0].account_balance += 100000;

		bankData.updateOne({ _id: updatedPerson._id }, updatedPerson, { w: 1 }, function (err, op_result) {

			if (err) {
				return console.error(err);
			}

			console.log('sucessfully updated ' + op_result.result.n + ' person document');

			//retrieve the inserted collection from mongodb
			//should be the exact same object we just updated
			bankData.findOne({ _id: updatedPerson._id }, function (err, doc) {

				if (err) {
					return console.error(err);
				}

				console.log('retrieved person: ' + doc.first_name + ' ' + doc.last_name);
				console.log('accounts: ');
				for (var i in doc.accounts) {
					console.log('Type: ' + doc.accounts[i].account_type);
					console.log('Balance: ' + doc.accounts[i].account_balance);
				}

				//now delete the document we just inserted

				bankData.remove({ _id: updatedPerson._id }, function (err, count) {

					if (err) {
						db.close();
						return console.error(err);
					}
					console.log('sucessfully deleted documents');

					return db.close();
				});
			});
		});
		return;
	});
	return console.log("Connected correctly to server");
});
