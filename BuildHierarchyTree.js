class Employee {

    //Constructor, Time O(1), Space O(1)
    constructor(id, name, managerId) {
        this.id = id;
        this.name = name;
        this.managerId = managerId;
        this.subordinates = {};
    }
}

class BuildHierarchyTree {
    employees = new Map();
    root = null;

    //Read data and build map, Iteration, Time O(n), Space O(n), n is number of employees
    readDataAndCreateMap(lines)  {        		
		for (const strLine of lines) { 			
			var values = strLine.split(" ");
            var employee;
			if (values.length >= 4)  						
				employee = new Employee(values[0], values[1] + " " + values[2], values[3]);		          
			else 
				employee = new Employee(values[0], values[1] + " " + values[2], "0");		
			this.employees.set(employee.id, employee);
			if (employee.managerId == 0) 
                this.root = employee;
		}
	}

    //Build tree, Recursion, Time O(n), Space O(h), n is number of employees, h is levels of hierarchy tree
    buildHierarchyTree(root) {
        var employee = root;
        var subs = this.getSubsById(employee.id);
        employee.subordinates = subs;
        if (subs.length == 0)
            return;
        for (const em of subs) 
           this.buildHierarchyTree(em);
    }	

    //Get subordinates list by given id, Time O(n), Space O(k) ~ O(n), k is number of subordinates
    getSubsById(managerId) {
        var subs = new Array();
        for (const em of this.employees.values()) {
            if (em.managerId == managerId) 
                subs.push(em);
        }
        return subs;
    }

    //Print tree, Recursion, Time O(n), Space O(h)
    printHierarchyTree(root, level) {
        var str = "";
        for (let i = 0; i < level; i++) 
            str += "\t";
        str += root.name	 
        console.log(str);		 
        var subs = root.subordinates;
        for (const em of subs) 
            this.printHierarchyTree(em, level+1);
    }
}

const lines = [
    "1 Rob Choi 6",
    "2 Paul Marmolejo 5",
    "3 Lois Lemer 6",
    "4 Christie Jacobs 5",
    "5 Moises Medina 6",
    "6 Joseph Grant",
    "7 Andy Zuckeman 1",
    "8 Melaney Partner 3",
    "9 Cliff Gannett 5",
    "10 Mark O'Donnell 1"
];	

const tree = new BuildHierarchyTree();
tree.readDataAndCreateMap(lines);
tree.buildHierarchyTree(tree.root);
tree.printHierarchyTree(tree.root, 0);