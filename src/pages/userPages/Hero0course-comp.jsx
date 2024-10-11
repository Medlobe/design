export default function HeroCsection(){
    return(
        <div className="hero-sec">
            <img src="../assets/images/bg-cs.jpg" alt="" />
            <div className="hero-text">
                <h1>Practisioner</h1>
                <div className="search-dva">
                    <input type="text" placeholder="Search for a practioner by NAME, EMAIL, PROFESION etc...."/>
                    <a href="#">Search <i className="fas fa-search"></i></a>

                </div>
            </div>
        </div>
    )
}