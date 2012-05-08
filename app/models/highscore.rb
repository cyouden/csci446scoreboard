class Highscore < ActiveRecord::Base
  def to_s
    "#{score} #{name}"
  end
end
