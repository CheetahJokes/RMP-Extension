from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/upload_html', methods=['POST'])
def upload_html():
    data = request.get_json()
    html_content = data.get('html')
    
    # You can now process the HTML content in Python
    print("Received HTML content:", html_content[:100])

    # Save the HTML content to a file, process it, etc.
    with open("page.html", "w", encoding="utf-8") as f:
        f.write(html_content)
    
    return jsonify({"status": "success", "message": "HTML received and processed."})

if __name__ == '__main__':
    app.run(debug=True)