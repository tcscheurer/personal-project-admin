SELECT * FROM employees
JOIN routes ON (routes.employeephone = employees.phone)
WHERE routes.managerauthid = $1
GROUP BY name, employees.id, employees.phone, routes.id;