class HighscoresController < ApplicationController
  def create
    Highscore.create(name: params[:name], score: params[:score])
  end
  
  def list
    @score_list = Highscore.find(:all, :order => "score").reverse.each.inject('') { |s, h| s += "<p>#{h.to_s}</p>" }
    
    respond_to do |format|
      format.text { @score_list }
      format.html { @score_list }
    end
  end
end
