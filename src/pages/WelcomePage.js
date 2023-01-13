import { Link } from "react-router-dom";

const WelcomePage = () => {
    return (
        <div className="container">
            <div className="container">
                <img className="rounded mx-auto d-block" src={process.env.PUBLIC_URL + "/easyurl_logo_512.png"} width="300" height="300" alt="Easy Url Logo" />
            </div>
            <div className="container">
                <h3>Welcome!</h3>
                    <p><strong>Easy Url</strong> is a simple app that helps to storge, organize and quickly search for links.</p> 
                <h3>Feature list</h3>
                <h4>Release 0.1</h4>
                <ul>
                    <li>add, edit and remove links</li>
                    <li>effectively search links using <Link to="https://en.wikipedia.org/wiki/Approximate_string_matching">fuzzy-search</Link> powered by <Link to="https://fusejs.io/">Fuse.js</Link></li>
                    <li>registering new users, securing registration using recaptcha</li>
                </ul>
            </div>
            <div className="container">
                <h3>About the project</h3>
                <h4>Code repository</h4>
                    <p>The application code is availabe in my <Link to="https://github.com/GrzegorzOpara">github</Link> and it consists three repositories:</p>
                <ul>
                    <li><Link to="https://github.com/GrzegorzOpara/easyurlbe">backend</Link></li>
                    <li><Link to="https://github.com/GrzegorzOpara/easyurlfe">frontend</Link></li>
                    <li><Link to="https://github.com/GrzegorzOpara/easyurlinfra">infrastructure</Link></li>
                </ul>
                <h4>Stack</h4>
                    <ul>
                        <li>Backend: <Link to="https://www.djangoproject.com/">Django</Link></li>
                        <li>Frontend: <Link to="https://reactjs.org/">React</Link> and <Link to="https://getbootstrap.com/">Bootstrap</Link></li>
                        <li>Hosting: <Link to="https://azure.microsoft.com/en-us/">Azure</Link> (Azure Static Web App (FE), Azure Web App (BE), Azure MySQL (BE))</li>
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