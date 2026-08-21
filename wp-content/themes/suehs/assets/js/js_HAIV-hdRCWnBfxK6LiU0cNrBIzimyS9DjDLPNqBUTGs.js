jQuery(document).ready(function() {

	// Only do this if the user is on the create a new SOP page
	if (document.location.pathname === '/node/add/standard-operating-procedure') {
		jQuery('#content').hide();

		// Load template file
		jQuery.get("/sites/all/modules/features/ehs_feature_messaging_new_sops/templates/confirm.html", function(html){
			jQuery('<section id="interstitial" class="container" style="margin-bottom: 60px;">' + html + '</section>').insertBefore( "#content" );

			jQuery('#confirm-create-sop').click(function(e) {
				e.preventDefault();

				jQuery('#interstitial').remove();
				jQuery('#content').show();

				// Scroll to the top of the page
				jQuery("html, body").animate({ scrollTop: 0 }, "slow");
			})
		});
	};

});;
