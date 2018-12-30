SELECT work_id,services.service_id,service_name,description from work 
inner join services on services.service_id = work.service_id