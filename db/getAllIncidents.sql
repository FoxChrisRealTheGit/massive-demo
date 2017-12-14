SELECT incidents.id, 
    state, 
    injuries.name AS injuries_name, 
    affectedareas.name AS affectedArea_Name,
    causes.name AS Causes_name FROM incidents
JOIN injuries ON incidents.injuryid = injuries.id
JOIN affectedareas ON affectedareas.id = injuries.affectedareaid
JOIN causes ON incidents.id = causes.id