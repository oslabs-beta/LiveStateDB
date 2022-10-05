const database =
{
  user1: {docs: ['6338734d9a5d5e69f3af9ef8', '6338735b9a5d5e69f3af9efa']},
}

const database2 = 
{
  '6338734d9a5d5e69f3af9ef8': ['user1', 'user2'],
  // user1: {docs: ['6338734d9a5d5e69f3af9ef8', '6338735b9a5d5e69f3af9efa']},
}

const database3 = 
{
  'user1': 'res object',
}

module.exports = JSON.stringify(database);