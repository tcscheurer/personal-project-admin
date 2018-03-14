SELECT employees.name, count(*) 
FROM employees 
JOIN routes 
ON (routes.employeephone = employees.phone) 
WHERE routes.managerauthid = $1
AND routes.status = 'complete'
GROUP BY employees.name;