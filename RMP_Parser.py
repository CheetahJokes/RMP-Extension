import ratemyprofessor
import json


class RMP_Parser():
    
    def __init__(self, school_name) -> None:
        self.school_name = school_name
        self.school_id = (ratemyprofessor.get_school_by_name(school_name))


    def __find(the_list, target):
        for s in the_list:
            if s.name == target:
                return s
            
    def parse_prof_ratings(self, professor_list):

        for i in professor_list:
            profs_found = ratemyprofessor.get_professors_by_school_and_name(self.school_id, i) 
            prof_id = RMP_Parser.__find(profs_found, i)
            file = {}
            file['Name:'] = prof_id.name
            file['School:'] = prof_id.school.name
            file['Department:'] = prof_id.department
            file['Overall Rating:'] = prof_id.rating
            file['Overall Difficulty:'] = prof_id.difficulty
            file['Reviews:'] = []
            ratings = prof_id.get_ratings()

            for i in range(len(ratings)):
                file['Reviews:'].append({})
                file['Reviews:'][i]["Class:"] = ratings[i].class_name
                file['Reviews:'][i]["Year:"] = str(ratings[i].date)[:4]
                file['Reviews:'][i]["Rating:"] = ratings[i].rating
                file['Reviews:'][i]["Difficulty:"] = ratings[i].difficulty
                file['Reviews:'][i]["Grade:"] = ratings[i].grade
                file['Reviews:'][i]["Attendance:"] = ratings[i].attendance_mandatory
                file['Reviews:'][i]["Comment:"] = ratings[i].comment

            json_object = json.dumps(file, indent=4)
            return json_object


def main():
    school = "Michigan State University" # pull from extension 
    profs = ['Jonathan Choti'] # pull from extension
    rmp = RMP_Parser(school)
    json_string = rmp.parse_prof_ratings(profs)
    print(json_string)
    #print(rmp.school_name)
    #print(json)
    #with open("sample.json", "w") as outfile:
       # outfile.write(json)

main()