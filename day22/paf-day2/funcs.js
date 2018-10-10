const mkQuery = function(sql, pool) {
    return function(args) {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, conn) => {
                if (err)
                    return reject(err);
                conn.query(sql, args || [],
                    (err, result) => {
                        conn.release();
                        if (err)
                            return reject(err);
                        resolve(result);
                    }
                )
            })
        })
    }
}

const parseTeam = function(body) {
    const teamName = body.team_name;
    const members = [];
    for (let i = 0; i < 3; i++)
        if (body[`email${i}`]) {
            const m = {}
            m[`email`] = body[`email${i}`]
            m[`nickname`] = body[`nickname${i}`]
            members.push(m)
        }
    return { teamName: teamName, members: members }
}

module.exports = {
    mkQuery, parseTeam
};

// const mkQuery = function(sql, pool) {
//     return function(args) {
//         console.log('>> args: ', args)
//         console.log('>> SQL: ', sql)
//         console.log('>> pool: ', pool)
//     }
// }

// const createTeam = mkQuery('insert into team(team_name) values (?)', '/pool/')

// createTeam('abc');
// createTeam('xyz');
/*
const greetings = function(name) {
    console.log('Hi ', name)
}
const mkGreetings = function(greetString) {
    return function(name) {
        console.log(greetString + ' ', name)
    }
}
greetings('fred');
const hiGreetings = mkGreetings('Hi>>>>');
const helloGreetings = mkGreetings('Hello')
hiGreetings('Barney')
hiGreetings('Betty')
helloGreetings('Fred')
*/