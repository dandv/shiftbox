
(function(){

	xtag.register('x-shiftbox', {
		lifecycle: {
			created: function(){
				// flag to prevent opened and closed event from firing multiple times
				// when transitionend is fired for each animated property
				this.xtag.data.opened = this.hasAttribute('open');
			}
		},
		events:{
			'transitionend': function(e){
				if (xtag.matchSelector(e.target,'x-shiftbox > section')){
					if (this.hasAttribute('open') && !this.xtag.data.opened){
						this.xtag.data.opened = true;
						xtag.fireEvent(this, 'opened');
					}
					else if(!this.hasAttribute('open') && this.xtag.data.opened) {
						this.xtag.data.opened = false;
						xtag.fireEvent(this, 'closed');
					}
				}
			}
		},
		accessors: {
			'shift': {
				attribute: {},
				get: function(){
					return this.getAttribute('shift') || '';
				}
			},
			'open': {
				attribute: {},
				set: function(){
					var asideWidth = getComputedStyle(xtag.query(this, 'aside')[0]).width;
					this.setAttribute('data-asideSize', asideWidth);
				}
			}
		},
		methods: {
			'toggle': function(){
				if (this.hasAttribute('open')){
					this.removeAttribute('open');
				} else {
					this.setAttribute('open','');
				}
			}
		}
	});

})();