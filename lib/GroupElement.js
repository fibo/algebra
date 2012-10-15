
function GroupElement(arg) {
  var self = this;

  var data = arg.data;
  this.getData = function () { return data; }

}

GroupElement.prototype = {
  clone: function () {
    var arg = {};
    arg.data = this.getData();
    return new GroupElement(arg);
  }
};

module.exports = GroupElement;

