
                String.prototype.startsWith = function (stringStart) {
                    return (this.indexOf(stringStart) === 0);
                };


                String.prototype.endsWith = function (stringEnd) {
                    return (  this.lastIndexOf(stringEnd) === (this.length - stringEnd.length));
                };


                String.prototype.stripHTML = function () {
                    var regex = /<[^>]*>/g;
                    return this.replace(regex, "");
                };