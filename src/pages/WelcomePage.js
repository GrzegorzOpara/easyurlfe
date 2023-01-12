const WelcomePage = () => {
    return (
        <div className="container">
            <div className="container">
                <img class="rounded mx-auto d-block" src={process.env.PUBLIC_URL + "/easyurl_logo_512.png"} width="300" height="300" alt="Easy Url Logo" />
            </div>
            <div className="container">
                <h3>Welcome!</h3>
                    <p><strong>Easy Url</strong> is a simple app that helps to storge, organize and quickly search for links.</p> 
                <h3>Feature list</h3>
                <h4>Release 0.9</h4>
                <ul>
                    <li>add, edit and remove links</li>
                    <li>effectively search links using <a href="https://en.wikipedia.org/wiki/Approximate_string_matching">fuzzy-search</a> powered by <a href="https://fusejs.io/">Fuse.js</a></li>
                </ul>
            </div>
            <div className="container">
                <h3>About the project</h3>
                <h4>Code repository</h4>
                    <p>The application code is availabe in my <a href="https://github.com/GrzegorzOpara">github</a> and it consists three repositories:</p>
                <ul>
                    <li><a href="https://github.com/GrzegorzOpara/easyurlbe">backend</a></li>
                    <li><a href="https://github.com/GrzegorzOpara/easyurlfe">frontend</a></li>
                    <li><a href="https://github.com/GrzegorzOpara/easyurlinfra">infrastructure</a></li>
                </ul>
                <h4>Stack</h4>
                    <ul>
                        <li>Backend: <a href="https://www.djangoproject.com/">Django</a></li>
                        <li>Frontend: <a href="https://reactjs.org/">React</a> and <a href="https://getbootstrap.com/">Bootstrap</a></li>
                        <li>Hosting: <a href="https://azure.microsoft.com/en-us/">Azure</a> (Azure Static Web App, Azure Web App, Azure MySQL)</li>
                    </ul>
            </div>
            <div className="container">
                <h3>License</h3>
                <p className="lead">MIT License</p>

                <p className="lead">Copyright (c) 2022 - Grzegorz Opara</p>
                <p>
                Permission is hereby granted, free of charge, to any person obtaining a copy
                of this software and associated documentation files (the "Software"), to deal
                in the Software without restriction, including without limitation the rights
                to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
                copies of the Software, and to permit persons to whom the Software is
                furnished to do so, subject to the following conditions:
                </p> 
                <p>
                The above copyright notice and this permission notice shall be included in all
                copies or substantial portions of the Software.
                </p> 
                <p>
                THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
                IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
                FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
                AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
                LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
                OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
                SOFTWARE.    
                </p> 
            </div>
        </div>
    )
}

export default WelcomePage