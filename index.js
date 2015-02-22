var data = [];

$(document).ready(
		function() {

			var app = {
				// 초기 리스트
				init_list : function() {

					$.post("./data.json", function(result) {

						data = result;

						console.log("init", data);
						
						$("table[name=table01] tbody tr").remove();

						_.each(result, function(obj) {

							var $tr = $("<tr>" + "<td>" + obj.name + "</td>"
									+ "<td>" + obj.age + "</td>" + "<td>"
									+ obj.email + "</td>" + "</tr>");

							$tr.appendTo("table[name=table01] tbody");

						});

					}, "json");
				},

				// 공통 리스트
				common_list : function(data) {

					$.post("./data.json", function(result) {

						// 등록한 데이터가 있으면 등록한 데이터를 추가하고 등록한 데이터가 없으면 지나감.
						/*if ($.isEmptyObject(data)) {
							data = result;
						}*/

						console.log("common", data);
						
						// 중복 제거
						$("table[name=table01] tbody tr").remove();

						// data 값 리스트에 입력
						_.each(data, function(obj) {

							var $tr = $("<tr>" + "<td>" + obj.name + "</td>"
									+ "<td>" + obj.age + "</td>" + "<td>"
									+ obj.email + "</td>" + "</tr>");

							// data 리스트 출력
							$tr.appendTo("table[name=table01] tbody");

						});

					}, "json");

				},

				// input 초기화 및 팝업 닫기
				form_init : function() {

					// modal창 숨김
					$("#regpop").hide();
					$("#modpop").hide();

					// input 초기화
					$("input[name=_id]").val("");
					$("input[name=name]").val("");
					$("input[name=age]").val("");
					$("input[name=email]").val("");

				}

			};

			// 초기 리스트 호출
			app.init_list();

			var iselect = [];

			// 행 선택
			$("table[name=table01]").on("click", "tr", function() {

				// 선택한 행 index 추출
				iselect = $(this).index();

				// 행 하나만 선택되도록
				$(this).parent().find("tr").css("color", "black");
				$(this).css("color", "red");

				// 선택한 값 수정 창에 입력
				$("input[name=mod_id]").val(data[iselect]._id);
				$("input[name=mod_name]").val(data[iselect].name);
				$("input[name=mod_age]").val(data[iselect].age);
				$("input[name=mod_email]").val(data[iselect].email);

			});

			// 등록 클릭
			$("button[name=b_reg]").click(function() {

				// 공통 리스트 출력
				app.common_list(data);

			});		
			
			// 등록 후 확인
			$("button[name=save]").click(function() {

				var rtn = {
					_id : $("input[name=_id]").val(),
					name : $("input[name=name]").val(),
					age : $("input[name=age]").val(),
					email : $("input[name=email]").val()
				};

				// 등록한 데이터 입력
				data.push(rtn);

				// 등록 리스트 호출
				$("button[name=b_reg]").trigger('click');

				// input 값 초기화 및 팝업창 닫기
				app.form_init();

			});
			

			// 수정 클릭
			$("button[name=b_mod]").click(function() {

				// 공통 리스트 호출
				app.common_list(data);

			});

			
			// 수정 후 확인
			$("button[name=modify]").click(function() {

				// data 배열에 있는 값 교체
				data[iselect]._id = $("input[name=mod_id]").val();
				data[iselect].name = $("input[name=mod_name]").val();
				data[iselect].age = $("input[name=mod_age]").val();
				data[iselect].email = $("input[name=mod_email]").val();

				// 수정 리스트 호출
				$("button[name=b_mod]").trigger('click');

				// 수정 값 초기화 및 닫기
				app.form_init();

			});
			
			// 삭제 클릭
			$("button[name=b_del]").click(function() {

				// data에서 선택한 값 제외
				data = $.grep(data, function(value) {
					return value != data[iselect];
				});

				// 공통 리스트 호출
				app.common_list(data);

			});			

		});
