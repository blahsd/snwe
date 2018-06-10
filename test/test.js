
const assert = require('assert');
const utils = require('../app/js/shared.js');

describe('shared.js', function() {
  describe('removeFromArray()', function() {
    it("should return the array minus the item in argument", function() {
      assert.equal( utils.removeFromArray([1,2,3], 1), [2,3] );
    });
  });
});
