export namespace models {
	
	export class NutritionalInfo {
	    Calories: number;
	    Carbs: number;
	    Sugar: number;
	    Fat: number;
	    Protein: number;
	    Fiber: number;
	    Salt: number;
	    VitaminA: number;
	    VitaminB: number;
	    VitaminC: number;
	    VitaminD: number;
	    VitaminE: number;
	    VitaminK: number;
	    Calcium: number;
	    Iron: number;
	    Potassium: number;
	    Magnesium: number;
	    Zinc: number;
	
	    static createFrom(source: any = {}) {
	        return new NutritionalInfo(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.Calories = source["Calories"];
	        this.Carbs = source["Carbs"];
	        this.Sugar = source["Sugar"];
	        this.Fat = source["Fat"];
	        this.Protein = source["Protein"];
	        this.Fiber = source["Fiber"];
	        this.Salt = source["Salt"];
	        this.VitaminA = source["VitaminA"];
	        this.VitaminB = source["VitaminB"];
	        this.VitaminC = source["VitaminC"];
	        this.VitaminD = source["VitaminD"];
	        this.VitaminE = source["VitaminE"];
	        this.VitaminK = source["VitaminK"];
	        this.Calcium = source["Calcium"];
	        this.Iron = source["Iron"];
	        this.Potassium = source["Potassium"];
	        this.Magnesium = source["Magnesium"];
	        this.Zinc = source["Zinc"];
	    }
	}
	export class MealDTO {
	    id: string;
	    name: string;
	    description: string;
	    nutritions: NutritionalInfo;
	    components: RecordDTO[];
	    showInSearch: boolean;
	
	    static createFrom(source: any = {}) {
	        return new MealDTO(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.id = source["id"];
	        this.name = source["name"];
	        this.description = source["description"];
	        this.nutritions = this.convertValues(source["nutritions"], NutritionalInfo);
	        this.components = this.convertValues(source["components"], RecordDTO);
	        this.showInSearch = source["showInSearch"];
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice && a.map) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}
	export class RecordDTO {
	    id: string;
	    meal: MealDTO;
	    weight: number;
	    dailyDiet: string;
	
	    static createFrom(source: any = {}) {
	        return new RecordDTO(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.id = source["id"];
	        this.meal = this.convertValues(source["meal"], MealDTO);
	        this.weight = source["weight"];
	        this.dailyDiet = source["dailyDiet"];
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice && a.map) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}
	export class DailyDietDTO {
	    date: string;
	    records: RecordDTO[];
	
	    static createFrom(source: any = {}) {
	        return new DailyDietDTO(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.date = source["date"];
	        this.records = this.convertValues(source["records"], RecordDTO);
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice && a.map) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}
	
	

}

