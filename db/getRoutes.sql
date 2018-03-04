SELECT *
FROM routes
JOIN employees ON (routes.employeephone = employees.phone) WHERE routes.employeephone=$1 AND routes.managerauthid=$2;