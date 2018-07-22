var expect = require('expect');

var {generateMessage} = require('./message.js');

describe('generateMessage', () => {
  it('Should generate a correct message object', () => {
    var from = 'John';
    var text = 'Simple Text';
    var message = generateMessage(from, text);

    expect(message.createdAt).toBeA('number');
    expect(message).toInclude({from, text});
  });
});
