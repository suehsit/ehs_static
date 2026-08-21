/**
 * JS that can be loaded in the end of the body tag
 */

//var $ = jQuery.noConflict(); // Enable the $ as an alias for jQuery
//$ = jQuery.noConflict();

$("a.mobile-toggle__menu.button.button--small").click(function () {
  $(".header-navs").slideToggle();
});

// Init the sliders on the homepage
const baseSliderSettings = {
  infinite: true,
  dots: true,
  speed: 800,
  responsive: [
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 4,
      },
    },
    {
      breakpoint: 900,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
      },
    },
    {
      breakpoint: 520,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
      },
    },
  ],
};

// Create specific versions for each slider
var fiveSlideConfig = $.extend(true, {}, baseSliderSettings, {
  slidesToShow: 5,
  slidesToScroll: 5,
});

var threeSlideConfig = $.extend(true, {}, baseSliderSettings, {
  slidesToShow: 4,
  slidesToScroll: 4,
});

// Init sliders
$(".topics-slider, .roles-slider").slick(fiveSlideConfig);
$(".products-slider").slick(threeSlideConfig);

/**
 * Listen for things to be added/removed from the users My EH&S page and notify the user accordingly
 */
$(document).on(
  "favorites-updated-single",
  function (event, favorites, post_id, site_id, status) {
    const pageTitle = $(".page-title .title").text();

    // Check if the alert element already exists in the html
    if ($(".my-ehs-alert").length === 0) {
      // It does not exist yet so create it
      var elAlert = $('<div class="alert alert--info my-ehs-alert"></div>');
      $("h1.title").parent().append(elAlert);
    }

    if (status === "inactive") {
      // Removed from My EH&S
      $(".my-ehs-alert").text(
        pageTitle + " has been removed from your My EH&S page."
      );
    } else if (status === "active") {
      // Added to My EH&S
      $(".my-ehs-alert").text(
        pageTitle + " has been added from your My EH&S page."
      );
    }

    $(".my-ehs-alert").slideDown(350, function () {
      // Set a timer for hiding this notification
      setTimeout(function () {
        $(".my-ehs-alert").slideUp(350, function () {
          $(".my-ehs-alert").remove();
        });
      }, 4000);
    });
  }
);

/**
 * Add Google Analytics integration to file and print links
 */
$("a").each(function (e) {
  var $this = $(this),
    href = $this.prop("href");

  if (href.search(/.pdf/i) > -1) {
    // Found a PDF link
    $this.attr("onclick", "ga('send','event','Download','PDF', this.href);");
  } else if (href.search(/.doc/i) > -1 || href.search(/.docx/i) > -1) {
    // Found a Word DOC link
    $this.attr(
      "onclick",
      "ga('send','event','Download','MS Word', this.href);"
    );
  } else if (href.search(/.xls/i) > -1 || href.search(/.xlsx/i) > -1) {
    // Found an Excel link
    $this.attr(
      "onclick",
      "ga('send','event','Download','MS Excel', this.href);"
    );
  } else if (href.search(/.ppt/i) > -1 || href.search(/.pptx/i) > -1) {
    // Found a PowerPoint link
    $this.attr(
      "onclick",
      "ga('send','event','Download','MS PowerPoint', this.href);"
    );
  } else if (
    href.search(/javascript:window.print()/i) > -1 ||
    href.search(/.pptx/i) > -1
  ) {
    // Found a print link
    $this.attr(
      "onclick",
      "ga('send','event','Print','Print', window.location.href);"
    );
  }
});

/**
 * Cache busting for form submissions
 */
$("#home-search-form, #search-form, #search-form-mobile").submit(function () {
  // Add a timestamp to the cache busting input field
  var ts = Date.now();
  $(".cache-buster").val(ts);

  return true;
});

// Modify the breadcrumbs if the user is viewing a product category page in Woocommerce
if (window.location.pathname.indexOf("/product-category/") === 0) {
  $(".breadcrumbs div.container div ul").html(
    '<li><a href="/">Home</a> <i class="fa fa-angle-right"></i></li><li><a href="/safety-store">Safety Store</a> <i class="fa fa-angle-right"></i></li><li class="current">Category: ' +
      $("h1.title").text() +
      "</li>"
  );
}

// Remove the woocommerce class from the body so some button styles don't break
if ($("body").hasClass("woocommerce")) {
  $("body").removeClass("woocommerce");
}

$(document).on("updated_cart_totals", function (event) {
  var table = $(".shop_table > tbody");
  var newTotal = 0;
  table.find(".product-quantity").each(function () {
    newTotal += parseInt($(this).find("input.qty").val());
  });

  if (newTotal === 0) {
    // Hide any cart totals on screen
    $("#safety-store-cart").hide();
  } else {
    // Update any cart totals on screen
    //$('#safety-store-cart').show();
    $("#safety-store-item-count, #safety-store-item-count-mobile").text(
      newTotal.toString()
    );
  }
});

// Listen for items to be removed from the cart
//$(document).ajaxComplete(function(event, xhr, ajaxOpts) {
// Check if the ajax call was to remove an item from the Woocommerce cart
/*if (ajaxOpts.url.indexOf("cart?remove_item") !== -1) {
		if ($('input[name$="[qty]"]').length === 0) {
			// All items have been removed from the cart
			$('#safety-store-cart').hide();
			$('#safety-store-cart-mobile').hide();
		};
	};*/
//console.log(ajaxOpts.url); // @todo
//});

/**
 * Add show/hide links above comment replies and set the initial display state of comment replies to `none`
 */
$("#comments ol.comment-list li ol.children").each(function () {
  var countReplies = $(this).find("> li").length;
  //$('<a class="toggleCommentReplies" style="cursor: pointer;"><strong>Show/Hide Replies (' + $(this).find('> li').length + ')</strong></a>').insertBefore($(this));
  $(
    '<a class="toggleCommentReplies" style="cursor: pointer;"><strong>View ' +
      countReplies +
      (countReplies === 1 ? " Reply" : " Replies") +
      ' <i class="fa fa-chevron-down" aria-hidden="true"></i></strong></a>'
  ).insertBefore($(this));
  //$(this).hide();
});

/**
 * Show/hide comment replies
 */
$(".toggleCommentReplies").on("click", function (e) {
  e.preventDefault();

  var currentHtml = $(this).html(),
    newHtml = "";

  if ($(this).siblings("ol.children").css("display") === "none") {
    $(this).siblings("ol.children").show();
    newHtml = currentHtml
      .replace("View", "Hide")
      .replace("fa-chevron-down", "fa-chevron-up");
    $(this).html(newHtml);
  } else {
    $(this).siblings("ol.children").hide();
    newHtml = currentHtml
      .replace("Hide", "View")
      .replace("fa-chevron-up", "fa-chevron-down");
    $(this).html(newHtml);
  }
});

/**
 * Convert an HTML string to RTF
 *
 * 		Found at:		https://stackoverflow.com/a/46656606
 * 		Updated with:	https://stackoverflow.com/a/56597275
 */
function convertHtmlToRtf(html) {
  if (!(typeof html === "string" && html)) {
    return null;
  }

  var tmpRichText, hasHyperlinks;
  var richText = html;

  // Delete HTML comments
  richText = richText.replace(/<!--[\s\S]*?-->/gi, "");

  // Singleton tags
  richText = richText.replace(
    /<(?:hr)(?:\s+[^>]*)?\s*[\/]?>/gi,
    "{\\pard \\brdrb \\brdrs \\brdrw10 \\brsp20 \\par}\n{\\pard\\par}\n"
  );
  richText = richText.replace(
    /<(?:br)(?:\s+[^>]*)?\s*[\/]?>/gi,
    "{\\pard\\par}\n"
  );

  // Empty tags
  richText = richText.replace(
    /<(?:p|div|section|article)(?:\s+[^>]*)?\s*[\/]>/gi,
    "{\\pard\\par}\n"
  );
  richText = richText.replace(/<(?:[^>]+)\/>/g, "");

  // Hyperlinks
  richText = richText.replace(
    /<a(?:\s+[^>]*)?(?:\s+href=(["'])(?:javascript:void\(0?\);?|#|return false;?|void\(0?\);?|)\1)(?:\s+[^>]*)?>/gi,
    "{{{\n"
  );
  tmpRichText = richText;
  richText = richText.replace(
    /<a(?:\s+[^>]*)?(?:\s+href=(["'])(.+)\1)(?:\s+[^>]*)?>/gi,
    '{\\field{\\*\\fldinst{HYPERLINK\n "$2"\n}}{\\fldrslt{\\ul\\cf1\n'
  );
  hasHyperlinks = richText !== tmpRichText;
  richText = richText.replace(/<a(?:\s+[^>]*)?>/gi, "{{{\n");
  richText = richText.replace(/<\/a(?:\s+[^>]*)?>/gi, "\n}}}");

  // Start tags
  richText = richText.replace(/<(?:b|strong)(?:\s+[^>]*)?>/gi, "{\\b\n");
  richText = richText.replace(/<(?:i|em)(?:\s+[^>]*)?>/gi, "{\\i\n");
  richText = richText.replace(/<(?:u|ins)(?:\s+[^>]*)?>/gi, "{\\ul\n");
  richText = richText.replace(/<(?:strike|del)(?:\s+[^>]*)?>/gi, "{\\strike\n");
  richText = richText.replace(/<sup(?:\s+[^>]*)?>/gi, "{\\super\n");
  richText = richText.replace(/<sub(?:\s+[^>]*)?>/gi, "{\\sub\n");
  richText = richText.replace(
    /<(?:p|div|section|article)(?:\s+[^>]*)?>/gi,
    "{\\pard\n"
  );

  // End tags
  richText = richText.replace(
    /<\/(?:p|div|section|article)(?:\s+[^>]*)?>/gi,
    "\n\\par}\n"
  );
  richText = richText.replace(
    /<\/(?:b|strong|i|em|u|ins|strike|del|sup|sub)(?:\s+[^>]*)?>/gi,
    "\n}"
  );

  // Strip any other remaining HTML tags [but leave their contents]
  richText = richText.replace(/<(?:[^>]+)>/g, "");

  // Prefix and suffix the rich text with the necessary syntax
  richText =
    "{\\rtf1\\ansi\n" +
    (hasHyperlinks ? "{\\colortbl\n;\n\\red0\\green0\\blue255;\n}\n" : "") +
    richText +
    "\n}";

  return richText;
}

/**
 * Replace placeholder values in a template string with actual values
 *
 * Example:
 *
 * 		let template = "<h1>{title}</h1><p>This is a {level} example of using templates in javascript</p>";
 * 		let html = updateTemplate(template, { title: "Hello!", level: "basic" });
 *
 * @method updateTemplate
 */
function updateTemplate(str, hash) {
  var string = str,
    key;
  for (key in hash)
    string = string.replace(new RegExp("\\{" + key + "\\}", "gm"), hash[key]);
  return string;
}

(function () {
  // Update the login URL to have a redirect back to the page we're on now
  //alert('hi!'); // @todo
  //console.log( $('#menu-link-login').attr('href') ); // @todo
  //echo '<h1>' . $_SERVER['REQUEST_URI'] . '</h1>'; // @todo /wp-login.php?saml_sso
  //alert(location.pathname.substring(1)); // @todo
  /*if ( $('#menu-link-login').text().toLowerCase() !== 'log out') {
		$('#menu-link-login').attr('href', '/wp-login.php?saml_sso&redirect_to=' + location.pathname.substring(1))
	};*/

  /*$('#menu-link-login').off().on('click', function(e) {
		//e.preventDefault();
		document.cookie = 'sso_redirect_to=' + encodeURIComponent(location.pathname) + '; expires=; path=/';
	});*/

  $("a[href='/saml_login']").each(function () {
    // Add a click handler to any login links
    $(this)
      .off()
      .on("click", function (e) {
        if (location.pathname !== "" && location.pathname !== "/") {
          document.cookie =
            "sso_redirect_to=" +
            encodeURIComponent(location.pathname) +
            "; expires=; path=/";
        } else if (location.search !== "") {
          document.cookie =
            "sso_redirect_to=" +
            encodeURIComponent(location.search) +
            "; expires=; path=/";
        }
      });
  });
})();
