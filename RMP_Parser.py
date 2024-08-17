import ratemyprofessor
import json
from flask import Flask, request, jsonify
from flask_cors import CORS
import time

'''app = Flask(__name__)
CORS(app)'''

class RMP_Parser:
    
    def __init__(self, school_name) -> None:
        self.school_name = school_name
        self.school_id = ratemyprofessor.get_school_by_name(school_name)

    def __find(self, the_list, target):
        for s in the_list:
            if s.name == target:
                return s
    
    def parse_prof_ratings(self, professor):
        file = {}
        profs_found = ratemyprofessor.get_professors_by_school_and_name(self.school_id, professor)
        prof_id = self.__find(profs_found, professor)
        if not prof_id:
            return json.dumps({"error": "Professor not found"}, indent=4)
        
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

'''@app.route('/process', methods=['POST'])
def process_string():
    try:
        data = request.json
        input_string = data.get('text', '')
        print("Received input:", input_string)

        # Create RMP_Parser instance with a fixed school name
        school_name = "Michigan State University"
        rmp = RMP_Parser(school_name)

        # Process the professor's name
        json_string = rmp.parse_prof_ratings(input_string)
        return jsonify({'processed': json_string})
    
    except Exception as e:
        print(f"An error occurred: {str(e)}")
        return jsonify({"error": "Internal Server Error"}), 500

if __name__ == '__main__':
    app.run(debug=True)'''

def main():
    start = time.time()
    rmp = RMP_Parser("Michigan State University")
    print(rmp.parse_prof_ratings("Richard Enbody"))
    print(time.time()-start)


main()
