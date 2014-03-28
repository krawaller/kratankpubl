_.mixin({
	mapObj: function(obj,iterator,valaskeys,context){
		var keys = _.keys(obj);
		return _.reduce(_.map(obj,iterator,context),function(memo,val,i){
			return _.extend(_.object(valaskeys?[obj[keys[i]]]:[keys[i]],[val]),memo);
		},{});
	},
	delayMethod: function(obj,methodname,wait){
		return setTimeout(_.bind(obj[methodname],obj),wait);
	}
});