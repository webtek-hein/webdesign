$(document).ready(function() {

	// on show bootstrap modal
	$('.modal').on('show.bs.modal',function(e){
		let sid = $(e.relatedTarget).data('sid');
		let uid = $(e.relatedTarget).data('uid');
		let step = '<span class="step"></span>';
		// set service name
		$('#sname').text($(e.relatedTarget).data('servicename'));

		$('#nextBtn').attr('data-uid',uid);
		// set list for works
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
				step += '<span class="step"></span>';
			}});
		//set work specifics
		$.ajax({
			url: "/specifics/"+sid, 
			success: function(result){
				let list = "";

				if(result.length > 0){
					result.forEach(function(specifics) {
						list += 
						`<div class="custom-control custom-radio">
						<input id="${specifics.specifics_id}" value="${specifics.specifics_id}" type="radio" 
						class="custom-control-input" name="specifics">
						<label for="${specifics.specifics_id}"  class="custom-control-label">${specifics.specifics}</label>
						</div></div>`;

					});

					console.log(specifics)
					$('#specifics').html(list);

					step += '<span class="step"></span>';

				}else{
					$('#specificstab').remove();
				}	
				$('#steps').html(step);
			}});
	});

	// on close of modal go to service provider list
	$('.modal').on('hidden.bs.modal',function(){
		window.location.hash = '#spdiv';
		window.location.reload(true);
	});

	//search for service provider
	$('#searchsp').click(function() {
		let searchval = $('#searchinput').val();
		window.location.href="#spdiv";

		let tabs = "";

		if(searchval){
			$.ajax({
				url: "/search/"+searchval, 
				success: function(result){
					if(result.length > 0){
						result.forEach(function(sp) {
							tabs += `
							<div class="col-md-6 col-lg-4 mb-5 mb-lg-5">
							<div class="team-member">

							<img src="/assets/images/person_6.jpg" alt="Image" class="img-fluid">

							<div class="text">

							<h2 class="mb-2 font-weight-light h4">${sp.user}</h2>
							<span class="d-block mb-2 text-white-opacity-05"> ${sp.service_name}</span>
							<p class="mb-4">Address:  ${sp.address}</p>
							<p>
							<button data-uid = "${sp.uid} %>" data-servicename = " ${sp.service_name }"
							data-sid = "${sp.service_id}" type="button" class="btn btn-dark inquire" 
							data-toggle="modal" data-target=".modal">Request</button>
							</div>

							</div>
							</div>`;
						});
						$('#servicep-list').html(tabs);
					}else{
						$('#servicep-list').html("No results found.");
					}
				}});
		}
	})


});


//on submit form
function submitRequest(){
	let work = $('input[name=work]').val();
	let date = $('input[name=date]').val();
	let from = $('input[name=from]').val();
	let to = $('input[name=to]').val();
	let specifics = $('input[name=specifics]').val();
	let sp = $('#nextBtn').data('uid');

	if(!specifics){
		specifics = 0;
	}

	let payload = {
		"work_id": work,
		"date": date,
		"from": from,
		"to": to,
		"specifics_id": specifics,
		"sp_id":sp
	}

	$.ajax({
		url: "/client/request", 
		type: "POST",
		data: JSON.stringify(payload),
		contentType: "application/JSON",
		success: function(result){
			window.location.href = "/transactions";
		}
	});
	

}