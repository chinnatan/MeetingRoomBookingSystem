const ldap = require('ldapjs');
const ldapConfig = require('../config')

const ldapOption = {
    url: ldapConfig.url,
    connectTimeout: 30000,
}

exports.login = (req, res) => {
    var adminClient = ldap.createClient(ldapOption)
    adminClient.bind(ldapConfig.username, ldapConfig.password, function (err) {
        if (err) {
            console.log('[LDAP Admin Client] Not Connected')
        } else {
            console.log('[LDAP Admin Client] Connected')

            adminClient.search('ou=Student, dc=it, dc=kmitl, dc=ac, dc=th', function (error, search) {
                console.log('[LDAP Admin Client] Searching.....');

                search.on('searchEntry', function (entry) {
                    console.log('entry: ' + JSON.stringify(entry.object));
                    res.send(JSON.stringify(entry.object))
                });
                search.on('error', function (err) {
                    console.error('error: ' + err.message);
                    res.send(JSON.stringify(err.message))
                });

                // adminClient.unbind(function (error) { if (error) { console.log(error.message); } else { console.log('[LDAP Client] Disconnected'); } });
            });
        }
    })

    // if (username && password) {
    //     connect.query('SELECT * FROM accounts WHERE username = ? AND password = ?', [username, password], function (err, results, fields) {
    //         console.log(results);
    //         if (results.length) {
    //             res.status(200).send({"account_id": results[0].account_id, "username": results[0].username, "account_type": results[0].account_type, "isLogin": true})
    //         } else {
    //             res.status(400).send({"isLogin": 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง'});
    //         }
    //         res.end();
    //     });
    // } else {
    //     res.status(400).send({"isLogin": 'กรุณากรอกชื่อผู้ใช้และรหัสผ่าน'});
    //     res.end();
    // }
}