$(document).ready(function() {
	$(".inquire").click(function() {
		let sid = $(this).data('sid');
		let uid = $(this).data('uid');
		// set service name
		$('#sname').text($(this).data('servicename'));

		$.ajax({
			url: "/serviceworks/"+sid, 
			success: function(result){
				let html = "";
				result.forEach(function(work) {
					html += 
					`<div class="custom-control custom-radio">
						<input id="${work.work_id}" value="${work.work_id}" type="radio" 
						class="custom-control-input" name="work">
						<label for="${work.work_id}"  class="custom-control-label">${work.description}</label>
					</div>`;
				});
				$('#workitems').html(html);
				
			}});
	});

});