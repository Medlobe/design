export default function ChatHeaderSearch(){
    return(
        <div className="sticky-chat-header-top">
        <div className="header-top">
          <h4>Chats</h4>
          <i className="fas fa-edit" style={{fontWeight:"400"}}></i>

        </div>
        <div className="serach-span">
          <i className="fas fa-search"></i>
          <input type="text" placeholder="search"/>
        </div>
        </div>
    )

}