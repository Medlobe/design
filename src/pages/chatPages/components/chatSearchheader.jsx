export default function ChatHeaderSearch(){
    return(
        <>
        <div className="header-left">
          <h4>Chats</h4>
          <i className="fas fa-edit" style={{fontWeight:"400"}}></i>

        </div>
        <div className="serach-span">
          <i className="fas fa-search"></i>
          <input type="text" placeholder="search"/>
        </div>
        </>
    )

}