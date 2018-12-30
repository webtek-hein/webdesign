SELECT uid,s.service_id,address,service_name,CONCAT(user_fname,' ',user_lname) as user from user 
inner join spservice sps on sps.uid = user.user_id
inner join services s on sps.service_id = s.service_id